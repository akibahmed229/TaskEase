import { Request, Response, Router } from "express";

const authRouter: Router = Router();

authRouter.get('/', (req: Request, res: Response) => {
    res.send('Auth route');
})

export default authRouter
