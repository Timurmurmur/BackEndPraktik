const { Sequelize, DataTypes } = require('sequelize');

//mysql://b64abaa6daff25:1084bbf9@eu-cdbr-west-02.cleardb.net/heroku_5025452c0c3de87?reconnect=true
const sequelize = new Sequelize('heroku_5025452c0c3de87', 'b64abaa6daff25', '1084bbf9', {
    host: 'eu-cdbr-west-02.cleardb.net',
    dialect: 'mysql',
    logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
});

// sequelize.sync().then(() => {
//     console.log("База данных синхронизированна");
// }).catch((err: Error) => console.log(err));

const Users = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: { //0 - user, 1 - admin
        type: Sequelize.INTEGER,
        allowNull: false
    },
    avatar: {
        type: Sequelize.BLOB,
        allowNull: true
    }
});

const Posts = sequelize.define("posts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    post: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

const Comments = sequelize.define("comments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Users.hasMany(Posts, { onDelete: "cascade" });
Users.hasMany(Comments, { onDelete: "cascade" });
Posts.hasMany(Comments, { onDelete: "cascade" });

export const login = (login: String, password: String) => {
    Users.findOne({ where: { login, password } })
        .then((user: any) => {
            if (!user) {
                console.log("Логин или пароль не совподают");
                return null;
            } else {
                return user.id
            }
        }).catch((err: Error) => console.log(err));
}

export const register = (login: String, password: String, nickname: String, email: String, type: Number) => {
    Users.create({
        login,
        password,
        nickname,
        email,
        type
    }).then((res: Object) => {
        return res;
    }).catch((err: Error) => console.log(err));
}

export const deliteUser = (id: Number) => {
    Users.destroy({
        where: {
            id
        }
    }).then((res: Number) => {
        return res
    })
}

export const changeUser = (id: Number, data: Object) => {
    Users.update(data, {
        where: { id }
    }).then((res: Array<Number>) => {
        console.log(res[0]);
        return res[0];
    });
}

export const addPost = (userId: Number, title: String, post: String) => {
    Posts.create({
        userId,
        title,
        post,
    }).then((res: any) => {
        return res;
    }).catch((err: Error) => console.log(err));
}

export const getAllPosts = () => {
    Posts.findAll({ raw: true })
        .then((posts: any) => {
            if (!posts) {
                console.log("Постов нет");
                return null;
            } else {
                return posts;
            }
        }).catch((err: Error) => console.log(err));
}

export const getPostsByUser = (userId: Number) => {
    Users.findByPk(userId).then((user: any) => {
        if (!user) {
            console.log("Пользователь не найден");
            return null;
        }
        user.getPosts({ raw: true })
            .then((res: any) => {
                if (!res) {
                    console.log("У этого пользователя нет статей");
                    return null;
                } else {
                    return res;
                }
            })
            .catch((err: Error) => console.log(err));
    }).catch((err: Error) => console.log(err));
}

export const changePost = (id: Number, data: Object) => {
    Posts.update(data, {
        where: { id }
    }).then((res: Array<Number>) => {
        console.log(res[0]);
        return res[0];
    });
}

export const delitePost = (id: Number) => {
    Posts.destroy({
        where: {
            id
        }
    }).then((res: Number) => {
        return res
    })
}

export const addComment = (postId: Number, userId: Number, comment: String) => {
    Comments.create({
        postId,
        userId,
        comment
    }).then((res: any) => {
        return res.dataValues;
    }).catch((err: Error) => console.log(err));
}

export const getAllCommentsByPost = (postId: Number) => {
    Comments.findAll({ raw: true, where: { postId } })
        .then((comments: any) => {
            if (!comments) {
                console.log("Комментариев нет");
                return null;
            } else {
                console.log(comments);
                return comments;
            }
        }).catch((err: Error) => console.log(err));
}

export const deliteCommment = (id: Number) => {
    Comments.destroy({
        where: {
            id
        }
    }).then((res: Number) => {
        return res
    })
}