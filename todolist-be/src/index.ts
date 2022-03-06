import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv";

import { connectDb } from './providers/Database';

import router from './routes/Router';

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use('/todos', router);
app.all('*', (req, res) => {
  res.status(404).json({});
});

const start = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  })
  .on("error", (err: Error) => {
    console.log('Error in server setup:', err.message)
  });
}

start();
