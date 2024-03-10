import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import { StudentRouters } from './app/config/modules/student/student.route';

app.use(express.text());
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRouters);

app.get('/', (req: Request, res: Response) => {
  // const s = 100;

  res.send('hello world');
});

export default app;
