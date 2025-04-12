import { Router, Request, Response } from 'express'
import { db } from '../db'
import { NewUser, users } from '../db/sechema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const authRouter: Router = Router()

interface SignUpBody {
    name: string
    email: string
    password: string
}

interface LoginBody {
    email: string
    password: string
}

// Request<{}, {}, SignUpBody> first {} is for params, second {} is for query, third {} is for body
// Ex: /users/:id for params, /users?id=1 for query, /users for body
authRouter.post(
    '/signup',
    async (req: Request<{}, {}, SignUpBody>, res: Response) => {
        try {
            // get the req body
            const { name, email, password } = req.body

            // check if the user already exists
            const existingUser = await db
                .select()
                .from(users)
                .where(eq(users.email, email))

            if (existingUser.length) {
                res.status(400).json({ msg: 'User already exists' })
                return
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10)

            // create a new user and store it in the database.
            const newUser: NewUser = {
                name,
                email,
                password: hashedPassword,
            }

            const [user] = await db.insert(users).values(newUser).returning()
            res.status(201).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: `Internal Server Error :${error}` })
        }
    },
)

authRouter.post(
    '/login',
    async (req: Request<{}, {}, LoginBody>, res: Response) => {
        try {
            // get the req body
            const { email, password } = req.body

            // check if the user already exists
            const [existingUser] = await db
                .select()
                .from(users)
                .where(eq(users.email, email))

            if (!existingUser) {
                res.status(400).json({ message: "User with this email doesn't exist!" })
                return
            }

            // compare the hash password
            const isMatched = await bcrypt.compare(password, existingUser.password)

            // check if password matches
            if (!isMatched) {
                res.status(400).json({ message: 'Invalid password' })
                return
            }

            // create a token
            const token = jwt.sign({ id: existingUser.id }, 'simpleKey')

            // if password matches, return the user
            res.status(200).json({ token, ...existingUser })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: `Internal Server Error :${error}` })
        }
    },
)

authRouter.post('/jwt', async (req: Request, res: Response) => {
    try {
        // get the header
        const token = req.header('x-auth-token')

        if (!token) {
            res.json(false)
            return
        }

        // verify the token is valid
        const verify = jwt.verify(token, 'simpleKey')

        if (!verify) {
            res.json(false)
            return
        }

        // get the user if the token is valid
        const verifiedToken = verify as { id: string }

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, verifiedToken.id))

        if (!user) {
            res.json(false)
            return
        }

        res.json(true)
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' })
        } else {
            res.status(500).json({ message: `Internal Server Error :${error}` })
        }
    }
})

authRouter.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        // check if user exists
        if (!req.user) {
            res.status(401).json({ msg: 'No user found!' })
            return
        }

        // get the user if the token is valid
        const userId = req.user

        const [user] = await db.select().from(users).where(eq(users.id, userId))

        if (!user) {
            res.status(401).json({ msg: 'Users not found!' })
            return
        }

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Internal Server Error :${error}` })
    }
})

export default authRouter
