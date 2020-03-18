const expres = require('express');
const router = express.Router();
const { login } = require('../db/db');
const jwt = require('jsonwebtoken');
const jwtSecret: String = 'Sekret epta na';

router.route('/login')
    .get((req: any, res: any) => {
        res.render('login')
    })
    .post(async (req: any, res: any, next: any) => {
        login.exec((err: any, user: any) => {
            const token: String = jwt.sign(user._id.toString(), jwtSecret);
            if (jwt.verify(token, jwtSecret)){ 
                res.render('index');
            } else return res.status(401).send({ message: 'Invalid token!' });
        })
        next;
    })