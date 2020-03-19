import express from 'express';
import bodyParser from 'body-parser';
import { post } from './routes/post';
import { user } from './routes/user';
import { auth } from './routes/auth';
const authMiddleWare = require('./middleware/auth')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', auth)
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
