const jwt = require('jsonwebtoken')
import { secret } from '../config/secret';

module.exports = (req: any, res: any, next: Function) => {
    const token = req.get('token');
    if (!token) {
        res.status(401).json({ error: 'Токен отсутствует' });
    } else {
        try {
            const decoded = jwt.verify(token, secret)
            req.userId = decoded.id
            next();
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ error: 'Поврежденный токен' })
            }
        }
    }
}