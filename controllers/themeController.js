const { Theme } = require('../models/models');
const ruleController = require('./ruleController');
const apiError = require('../error/apiError');

class themeController {
	/**
	 * Функция добавления темы
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 * @param {string} text - название темы
	 * @param {string} color - цвет темы
	 */ // доступна только с правами создания и редактирования постов

	async addTheme(req, res, next) {
		try {
			const { userid, projectid, text, color } = req.body;
			if (!projectid || !text || !color) {
				return next(
					apiError.badRequest('Отсутствует projectid, text или color!')
				);
			}
			const rule = await ruleController.getRules(userid, projectid);
			if (rule.createAndUpdatePlan) {
				if (
					await Theme.findOne({ where: { theme: text, projectId: projectid } })
				) {
					return next(
						apiError.badRequest('Тема с таким названием уже существует!')
					);
				} else {
					const themebd = await Theme.create({
						theme: text,
						projectId: projectid,
						color: color,
					});
					return res.json({ themebd: themebd });
				}
			} else return next(apiError.forbidden('Недостаточно прав!'));
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Функция получения всех тем
	 * @param {number} projectid - id проекта
	 */ // доступна всем

	async getThemes(req, res, next) {
		try {
			const { projectid } = req.query;
			if (!projectid) {
				return next(apiError.badRequest('Отсутствует projectid!'));
			}
			const themes = await Theme.findAll({ where: { projectId: projectid } });
			return res.json({ themes: themes });
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Функция обновления темы
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 * @param {number} themeid - id темы
	 * @param {string} text - название темы
	 * @param {string} color - цвет темы
	 */ // доступна только с правами создания и редактирования постов

	async updateTheme(req, res, next) {
		try {
			const { userid, projectid, themeid, text, color } = req.body;
			if (!projectid || !themeid || !text || !color) {
				return next(
					apiError.badRequest('Отсутствует projectid, themeid, text или color!')
				);
			}
			const rule = await ruleController.getRules(userid, projectid);
			if (rule.createAndUpdatePlan) {
				const theme = await Theme.update(
					{ theme: text, color: color },
					{ where: { id: themeid } }
				);
				return res.json({ theme: theme });
			} else return next(apiError.forbidden('Недостаточно прав!'));
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Функция обновления темы
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 * @param {number} themeid - id темы
	 */ // доступна только с правами создания и редактирования постов

	async deleteTheme(req, res, next) {
		try {
			const { userid, projectid, themeid } = req.body;
			if (!projectid || !themeid) {
				return next(apiError.badRequest('Отсутствует projectid или themeid!'));
			}
			const rule = await ruleController.getRules(userid, projectid);
			if (rule.createAndUpdatePlan) {
				await Theme.destroy({ where: { id: themeid } });
				return res.json({ theme: 'Тема удалена!' });
			} else return next(apiError.forbidden('Недостаточно прав!'));
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new themeController();
