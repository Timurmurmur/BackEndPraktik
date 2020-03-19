import express from 'express';
import { getAllPosts, getPost, addPost, changePost, deletePost } from '../db/db'

const post = express.Router();

post.get('/', async (req: any, res: any) => {
    const result = await getAllPosts();
    res.json(result);
});
post.get('/:id', async (req: any, res: any) => {
    const result = await getPost(req.params.id)
    res.json(result)
});
post.post('/', async (req: any, res: any) => {
    const result = await addPost(req.body.userId, req.body.title, req.body.post)
    res.json(result);
});
post.put('/:id', async (req: any, res: any) => {
    const result = await changePost(req.params.id, req.body)
    res.json(result);
});
post.delete('/:id', async (req: any, res: any) => {
    const result = await deletePost(req.params.id)
    res.json(result);
});
export { post };

