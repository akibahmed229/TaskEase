import express, {Express, Request, Response} from 'express'
import authRouter from './routes/auth';

const app: Express = express();

app.use(express.json());
app.use("/auth",authRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hola Mundo');
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})
