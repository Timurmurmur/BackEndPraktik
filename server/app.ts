import express from 'express';
import bodyParser from 'body-parser';
import { post } from './routes/post';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/post', post)

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
