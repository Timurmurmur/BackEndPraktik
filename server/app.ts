const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

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
