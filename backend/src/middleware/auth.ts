import { UUID } from 'crypto'
import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { users } from '../db/sechema'
import { db } from '../db'
import { eq } from 'drizzle-orm'

export interface AuthRequest extends Request {
  user?: UUID
  token?: string
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get the header
    const token = req.header('x-auth-token')

    if (!token) {
      res.status(401).json({ msg: 'No token provided, authorization denied' })
      return
    }

    // verify the token is valid
    const verify = jwt.verify(token, 'simpleKey')

    if (!verify) {
      res.status(401).json({ msg: 'Token is not valid' })
      return
    }

    // get the user if the token is valid
    const verifiedToken = verify as { id: UUID }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, verifiedToken.id))

    if (!user) {
      res.status(401).json({ msg: 'Users not found!' })
      return
    }

    req.user = verifiedToken.id
    req.token = token

    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' })
    } else {
      res.status(500).json({ message: `Internal Server Error :${error}` })
    }
  }
}
