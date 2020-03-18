const express = require('express');
const post = express.Router();

const post1 = post.get('/', (req: Request, res: any) => {
    res.send('posts All');
});

module.exports = { post1 }
// post.post('/', (req: Request, res: any) => {
//     res.send('add post');
// });

