const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

function start() {
    try {
        app.listen(PORT, () =>{
            console.log(`Server listen port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
