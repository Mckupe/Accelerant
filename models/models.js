const sequelize = require('../db');
const {DataTypes} = require('sequelize');

// здесь описываются таблицы базы данных, а также их отнешения

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //  id
    username: {type: DataTypes.STRING, allowNull: false}, // имя
    email: {type: DataTypes.STRING, unique: true, allowNull: false}, // почта
    password: {type: DataTypes.STRING}
})

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // id
    refreshToken: {type: DataTypes.STRING} // refresh токен
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} // id
})

const SocNet = sequelize.define('socnet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // id
    socnet: {type: DataTypes.STRING, allowNull: false}
})

const Theme = sequelize.define('theme', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // id
    theme: {type: DataTypes.STRING, allowNull: false}
})

const Rules = sequelize.define('rules', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // id
    rule1: {type: DataTypes.BOOLEAN}
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // id
    text: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.STRING},
    darft: {type: DataTypes.BOOLEAN},
    talk: {type: DataTypes.BOOLEAN},
    plan: {type: DataTypes.BOOLEAN}
})

const Img = sequelize.define('img', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // id
    img: {type: DataTypes.STRING, allowNull: false}
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // id
    comment: {type: DataTypes.STRING, allowNull: false}
})

User.hasMany(Project);
User.hasOne(Rules);
User.hasOne(Token);

Project.hasMany(Post);
Project.hasMany(SocNet);
Project.hasMany(Theme);

Post.hasMany(Img);
Post.hasMany(Comment);

module.exports = {
    User,
    Project,
    Rules, 
    Post,
    SocNet,
    Comment,
    Theme,
    Img,
    Token
}