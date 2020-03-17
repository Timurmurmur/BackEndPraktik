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

sequelize.sync().then(() => {
    console.log('База данных подключенна');
}).catch((err: Error) => console.log(err));

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

Users.hasMany(Posts);
Users.hasMany(Comments);
Posts.hasMany(Comments);

export const register = (login: String, password: String, nickname: String, email: String) => {
    Users.create({
        login,
        password,
        nickname,
        email
    }).then((res: Object) => {
        return res;
    }).catch((err: Error) => console.log(err));
}

export const login = (login: String, password: String) => {
    Users.findOne({ where: { login, password } })
        .then((user: any) => {
            if (!user) {
                return null;

            } else {
                return user.id
            }
        }).catch((err: Error) => console.log(err));
}





