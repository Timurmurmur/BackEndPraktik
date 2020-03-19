import { Sequelize, Model, DataTypes } from 'sequelize';
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

class Users extends Model { }
class Posts extends Model { }
class Comments extends Model { }
Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: { //0 - user, 1 - admin
        type: DataTypes.INTEGER,
        allowNull: false
    },
    avatar: {
        type: DataTypes.BLOB,
        allowNull: true
    },
}, {
    sequelize,
    modelName: "users"
});

Posts.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "posts"
});

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "comments"
});

Users.hasMany(Posts, { onDelete: "cascade" });
Users.hasMany(Comments, { onDelete: "cascade" });
Posts.hasMany(Comments, { onDelete: "cascade" });

export const login = async (login: string, password: string) => {
    return await Users.findOne({ raw: true, where: { login, password } })
        .then((user: any) => {
            if (!user) {
                console.log("Логин или пароль не совподают");
                return null;
            } else {
                return user
            }
        }).catch((err: Error) => console.log(err));
}

export const register = async (login: string, password: string, nickname: string, email: string, type: number) => {
    return await Users.create({
        login,
        password,
        nickname,
        email,
        type
    }, { raw: true }).then((res: Object) => {
        return res;
    }).catch((err: Error) => console.log(err));
}

export const getUser = async (id: number) => {
    return await Users.findOne({ raw: true, where: { id } })
        .then((user: any) => {
            if (!user) {
                return null;
            } else {
                return user
            }
        }).catch((err: Error) => console.log(err));
}

export const deleteUser = async (id: number) => {
    return await Users.destroy({
        where: {
            id
        }
    }).then((res: number) => {
        return res
    })
}

export const changeUser = async (id: number, data: Object) => {
    return await Users.update(data, {
        where: { id }
    }).then((res: Array<any>) => {
        console.log(res[0]);
        return res[0];
    });
}

export const addPost = async (userId: number, title: string, post: string) => {
    return await Posts.create({
        userId,
        title,
        post,
    }).then((res: any) => {
        return res;
    }).catch((err: Error) => console.log(err));
}

export const getPost = async (id: number) => {
    return await Posts.findByPk(id)
        .then((post: any) => {
            if (!post) {
                console.log("Такого поста нет");
                return null;
            } else {
                return post;
            }
        }).catch((err: Error) => console.log(err));
}

export const getAllPosts = async () => {
    return await Posts.findAll({ raw: true })
        .then((posts: any) => {
            if (!posts) {
                console.log("Постов нет");
                return null;
            } else {
                return posts;
            }
        }).catch((err: Error) => console.log(err));
}

export const getPostsByUser = async (userId: number) => {
    return await Users.findByPk(userId).then(async (user: any) => {
        if (!user) {
            console.log("Пользователь не найден");
            return null;
        }
        return await user.getPosts({ raw: true })
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

export const changePost = async (id: number, data: Object) => {
    return await Posts.update(data, {
        where: { id }
    }).then((res: Array<any>) => {
        return res[0];
    });
}

export const deletePost = async (id: number) => {
    return await Posts.destroy({
        where: {
            id
        }
    }).then((res: number) => {
        return res
    })
}

export const addComment = async (postId: number, userId: number, comment: string) => {
    return await Comments.create({
        postId,
        userId,
        comment
    }).then((res: any) => {
        return res.dataValues;
    }).catch((err: Error) => console.log(err));
}

export const getAllCommentsByPost = async (postId: number) => {
    return await Comments.findAll({ raw: true, where: { postId } })
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

export const deleteCommment = async (id: number) => {
    return await Comments.destroy({
        where: {
            id
        }
    }).then((res: number) => {
        return res
    })
}