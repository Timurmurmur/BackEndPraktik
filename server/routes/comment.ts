import express from 'express';
import { addComment, getAllCommentsByPost, deleteCommment, getCommment, getPost } from '../db/db'

const comments = express.Router();

comments.post('/', async (req: any, res: any) => {
    const { postId, comment } = req.body;
    const com = await addComment(postId, req.userId, comment);
    res.json(com);
})
comments.post('/all', async (req: any, res: any) => {
    const post = await getPost(req.body.postId);
    if (post) {
        const comments = await getAllCommentsByPost(req.body.postId);
        console.log(comments);
        res.json(comments);
    } else {
        res.status(401).json({ error: 'Поста с таким ID нет' })
    }
})
comments.delete('/:id', async (req: any, res: any) => {
    const com = await getCommment(req.params.id);
    if (com) {
        if (req.userId == com.userId) {
            const result = await deleteCommment(req.params.id)
            res.json(result);
        } else {
            res.status(401).json({ error: 'Отказано в доступе' })
        }
    } else {
        res.status(401).json({ error: 'Комментария с таким ID нет' })
    }
})

export { comments }