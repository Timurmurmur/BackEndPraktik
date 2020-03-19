import express from 'express';
import { register, login, getUser, deleteUser, changeUser } from '../db/db'
const user = express.Router();

user.post('/register', async (req: any, res: any) => {
    const type = 0;
    const user = await register(req.body.login, req.body.password, req.body.nickname, req.body.email, type)
    console.log(user);
    res.json(user);//Тут должен был JWT
})
user.post('/login', async (req: any, res: any) => {
    const user = await login(req.body.login, req.body.password)
    console.log(user);
    res.json(user);//Тут должен был JWT
})
user.get('/:id', async (req: any, res: any) => {
    const result = await getUser(req.params.id);
    res.json(result);
})
user.put('/:id', async (req: any, res: any) => {
    const result = await changeUser(req.params.id, req.body);
    res.json(result);
})
user.delete('/:id', async (req: any, res: any) => {
    const result = await deleteUser(req.params.id);
    res.json(result);
})
export { user }