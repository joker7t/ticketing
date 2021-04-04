import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import {currentUserRouter} from './routes/current-user';
import {signInRouter} from './routes/signin';
import {signOutRouter} from './routes/signout';
import {signUpRouter} from './routes/signup';
import {errorHandler} from '../../common/src/middlewares/error-handler';
import {NotFoundError} from '../../common/src/errors/not-found-error';
const cors = require('cors');

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cors());
app.use(cookieSession({
    signed: false,
    //ignore http, just care for https
    // secure: true
}));

//routers
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
//handle invalid routes
app.get('*', async () => {
    throw new NotFoundError();
});
//end routers

app.use(errorHandler);

export {app};