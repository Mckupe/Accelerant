const {User} = require('../models/models');
const tokenController = require('./tokenController');
const bcrypt = require('bcrypt');

class userController {

    /**
     * Функция авторизации
     * @param {string} username - Имя пользователя
     * @param {string} email - Email пользователя
     * @param {string} password - Пароль
     * Провнряем не зарегестрирован ли пользователь, если нет то хешируем пароль и создаем запись в бд,
     * также создаем пару токенов и возвращаем AccessToken на клиент 
     */

    async register(req, res) {
        const {username, email, password} = req.body;
        const candidate = await User.findOne({where: {email: email}});
        if (!candidate) {
            const hashpass = await bcrypt.hash(password, 5);
            const user = await User.create({username: username, email: email, password: hashpass});
            const tokens = tokenController.genereteToken(user.id, email);
            await tokenController.saveToken(user.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            res.json({user: user, token: tokens.accessToken});
        } else {
            res.json('Пользователь существует!');
        }
    }

    /**
     * Функция авторизации
     * @param {string} password - Пароль
     * @param {string} email - Email пользователя
     */

    async login(req, res) {
        const {password, email} = req.body;
        const candidate = await User.findOne({where: {email: email}});
        if (candidate) {
            let comppass = bcrypt.compareSync(password, candidate.password);
            if (!comppass) { res.json('Неверный пароль!') }
            else {
                const tokens = tokenController.genereteToken(candidate.id, email);
                await tokenController.saveToken(candidate.id, tokens.refreshToken);
                res.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: 15 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
                res.json({user: candidate, token: tokens.accessToken});
            }
        } else {
            res.json('Пользователь не найден!');
        }
    }

    /**
     * Функция выхода 
     * Удаляем refresh токен из бд и очищаяем куки
     */

    async logout(req, res) {
        const {refreshToken} = req.cookies;
        await tokenController.removeToken(refreshToken);
        res.clearCookie('refreshToken');
        return res.json("logout");
    }

    /**
     * Перезапись access токена
     * По refresh токену из кук, находим пользователя и генерируем новую пару токенов
     */

    async refresh(req, res) {
        const {refreshToken} = req.cookies;
        if (!refreshToken) throw new Error('Пользователь не авторизован!');
        const userData = tokenController.validateRefresh(refreshToken); // валидируем токен
        const findToken = await tokenController.findToken(refreshToken);
        if (!userData || !findToken) throw new Error('Пользователь не авторизован!');
        const user = await User.findOne({where: {id: userData.id}});
        const tokens = tokenController.genereteToken(user.id, user.email);
        await tokenController.saveToken(user.id, tokens.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });
        res.json(tokens.accessToken);
    }
}

module.exports = new userController();