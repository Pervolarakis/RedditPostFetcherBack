import express from 'express';
import { signUpRouter } from './routes/Register';
import { signInRouter } from './routes/logIn';
import { getPostsRouter } from './routes/getPostsByKeyword';
import { ErrorHandler } from './middlewares/errorHandler';
import { getPastQueriesByUser } from './routes/getPastQueriesByUser';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: ['http://eurytus.com:3000'],
    credentials: true }))

app.set('trust poxy', 1);

app.use(express.json())

app.use(signUpRouter);
app.use(signInRouter);
app.use(getPostsRouter);
app.use(getPastQueriesByUser)
app.use(ErrorHandler);


export {app};