const express = require('express');
const post = express.Router();

export const post1 = post.get('/', (req: Request, res: any) => {
    res.send('posts All');
});

// post.post('/', (req: Request, res: any) => {
//     res.send('add post');
// });

