import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';

app.use(express.text());
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    const s = 100;

    res.send(s);
});

export default app;


