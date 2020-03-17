const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('heroku_5025452c0c3de87', 'b64abaa6daff25', '1084bbf9', {
    host: 'eu-cdbr-west-02.cleardb.net',
    dialect: 'mysql',
    define: {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
});

