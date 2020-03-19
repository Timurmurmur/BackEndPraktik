import express from 'express';
import bodyParser from 'body-parser';
import { post } from './routes/post';
import { user } from './routes/user'
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/post', post)
app.use('/api/user', user)

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
