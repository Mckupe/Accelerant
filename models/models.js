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
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING} // refresh токен
})

const ProjectUsers = sequelize.define('projectusers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true} 
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}, // имя проекта
    nameCreator: {type: DataTypes.STRING, allowNull: false},
    arraySoc: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    favorit: {type: DataTypes.BOOLEAN, allowNull: false}
})

const SocNet = sequelize.define('socnet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    socnet: {type: DataTypes.STRING, allowNull: false}, // название соцсети
    link: {type: DataTypes.STRING}, // сылка на чат (телеграм)
    token: {type: DataTypes.STRING} // токен бота (телеграм)
})

const Theme = sequelize.define('theme', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    theme: {type: DataTypes.STRING, allowNull: false}, // название темы
    color: {type: DataTypes.STRING, allowNull: false} // цвет
})

const Rules = sequelize.define('rules', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    readAndCreateDraft: {type: DataTypes.BOOLEAN}, // 6 прав, по уровню возможностей, которые они предоставляют
    readTalkAndPlan: {type: DataTypes.BOOLEAN},
    anal: {type: DataTypes.BOOLEAN},
    createAndUpdatePlan: {type: DataTypes.BOOLEAN},
    talkToPlan: {type: DataTypes.BOOLEAN},
    superuser: {type: DataTypes.BOOLEAN}
})

const Post = sequelize.define('post', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	text: { type: DataTypes.STRING }, // текст поста
	time: { type: DataTypes.STRING }, // время публикации
	draft: { type: DataTypes.BOOLEAN }, // черновик?
	talk: { type: DataTypes.BOOLEAN }, // обсуждение?
	plan: { type: DataTypes.BOOLEAN }, // запланирован?
	socnetId: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false }, // массив id соцсетей
	themeId: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false }, // массив id тем
	nameCreator: { type: DataTypes.STRING, allowNull: false} // имя создателя
});

const Img = sequelize.define('img', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false} // название файла img
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false}, // текст комментария
    nameCreator: {type: DataTypes.STRING, allowNull: false}
})

User.belongsToMany(Project, {through: ProjectUsers});
User.belongsToMany(Rules, {through: ProjectUsers});
Project.belongsToMany(User, {through: ProjectUsers});

// связь юзера с проектами и правами многие ко многим, поэтому есть промежуточная табличка

User.hasMany(Comment); 
User.hasOne(Token);

Project.hasMany(Post);
Post.belongsTo(Project);

Project.hasMany(SocNet);
SocNet.belongsTo(Project);

Project.hasMany(Theme);
Theme.belongsTo(Project)

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
    Token,
    ProjectUsers
}