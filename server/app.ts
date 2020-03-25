import express from 'express';
import bodyParser from 'body-parser';
import { post } from './routes/post';
import { user } from './routes/user';
import { auth } from './routes/auth';
import { comments } from './routes/comment'
import cors from 'cors';

const authMiddleWare = require('./middleware/auth')

const PORT = 80;
const app = express();
app.use(
    cors({
      allowedHeaders: ["sessionId", "Content-Type"],
      exposedHeaders: ["sessionId"],
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
  );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', auth)
app.use('/api/comment', authMiddleWare, comments)
app.use('/api/post', authMiddleWare, post)
app.use('/api/user', authMiddleWare, user)

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Сервер на ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
