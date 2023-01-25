const { User } = require('../models/models');
const tokenController = require('./tokenController');
const bcrypt = require('bcrypt');
const apiError = require('../error/apiError');

class userController {
	/**
	 * Функция авторизации
	 * @param {string} username - Имя пользователя
	 * @param {string} email - Email пользователя
	 * @param {string} password - Пароль
	 * Провнряем не зарегестрирован ли пользователь, если нет то хешируем пароль и создаем запись в бд,
	 * также создаем пару токенов и возвращаем AccessToken на клиент
	 */

	async register(req, res, next) {
		try {
			const { username, email, password } = req.body;
			if (!username || !email || !password) {
				return next(
					apiError.badRequest('Некорректный username, email или password!')
				);
			}
			const candidate = await User.findOne({ where: { email: email } });
			if (!candidate) {
				const hashpass = await bcrypt.hash(password, 5);
				const user = await User.create({
					username: username,
					email: email,
					password: hashpass,
				});
				const tokens = tokenController.genereteToken(user.id, username, email);
				await tokenController.saveToken(user.id, tokens.refreshToken);
				res.cookie('refreshToken', tokens.refreshToken, {
					maxAge: 15 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				});
				return res.json({ token: tokens.accessToken, username: username });
			} else {
				return next(
					apiError.badRequest('Пользователь с таким email уже существует!')
				);
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Функция авторизации
	 * @param {string} password - Пароль
	 * @param {string} email - Email пользователя
	 */

	async login(req, res, next) {
		try {
			const { password, email } = req.body;
			if (!email || !password) {
				return next(apiError.badRequest('Некорректный email или password!'));
			}
			const candidate = await User.findOne({ where: { email: email } });
			if (candidate) {
				let comppass = bcrypt.compareSync(password, candidate.password);
				if (!comppass) {
					return next(apiError.internal('Указан неверный пароль!'));
				} else {
					const tokens = tokenController.genereteToken(
						candidate.id,
						candidate.username,
						email
					);
					await tokenController.saveToken(candidate.id, tokens.refreshToken);
					res.cookie('refreshToken', tokens.refreshToken, {
						maxAge: 15 * 24 * 60 * 60 * 1000,
						httpOnly: true,
					});
					return res.json({
						token: tokens.accessToken,
						username: candidate.username,
					});
				}
			} else {
				return next(apiError.internal('Пользователь не найден!'));
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Функция выхода
	 * Удаляем refresh токен из бд и очищаяем куки
	 */

	async logout(req, res) {
		try {
			const { refreshToken } = req.cookies;
			await tokenController.removeToken(refreshToken);
			res.clearCookie('refreshToken');
			return res.json('logout');
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Перезапись access токена
	 * По refresh токену из кук, находим пользователя и генерируем новую пару токенов
	 */

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			if (!refreshToken)
				return next(apiError.unauthorized('Пользователь не авторизован!'));
			const userData = tokenController.validateRefresh(refreshToken); // валидируем токен
			const findToken = await tokenController.findToken(refreshToken);
			if (!userData || !findToken)
				return next(apiError.internal('Отсутсвует токен или userdata!'));
			const user = await User.findOne({ where: { id: userData.id } });
			const tokens = tokenController.genereteToken(
				user.id,
				user.username,
				user.email
			);
			await tokenController.saveToken(user.id, tokens.refreshToken);
			res.cookie('refreshToken', tokens.refreshToken, {
				maxAge: 15 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(tokens.accessToken);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new userController();
