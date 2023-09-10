import express from 'express';
import { signUpRouter } from './routes/Register';
import { signInRouter } from './routes/logIn';
import { getPostsRouter } from './routes/getPostsByKeyword';
import { ErrorHandler } from './middlewares/errorHandler';
import { getPastQueriesByUser } from './routes/getPastQueriesByUser';
import cors from 'cors'
import { getSearchResultsById } from './routes/getSearchResultById';

const app = express();

app.use(cors())

app.set('trust poxy', 1);

app.use(express.json())

app.use(signUpRouter);
app.use(signInRouter);
app.use(getPostsRouter);
app.use(getPastQueriesByUser);
app.use(getSearchResultsById);
app.use(ErrorHandler);


export {app};