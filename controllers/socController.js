const { SocNet, Project } = require('../models/models');
const ruleController = require('./ruleController');
const apiError = require('../error/apiError');

class socController {
	/**
	 * Функция добавления социальной сети
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 * @param {string} socnet - название соц сети
	 * @param {string} link - ссылка на чат (телеграм)
	 * @param {string} token - токен бота (телеграм)
	 */ // доступна только с правами создателя/администратора

	async addSoc(req, res, next) {
		try {
			const { userid, projectid, socnet, link, token } = req.body;
			if (!projectid || !socnet || !link || !token) {
				return next(
					apiError.badRequest('Отсутствует projectid, socnet, link или token!')
				);
			}
			const rule = await ruleController.getRules(userid, projectid);
			if (rule.superuser) {
				const soc = await SocNet.create({
					socnet: socnet,
					link: link,
					token: token,
					projectId: projectid,
				});
				const project = await Project.findOne({ where: { id: projectid } });
				const arrSoc = project.arraySoc;
				arrSoc.push(socnet);
				await Project.update(
					{ arraySoc: arrSoc },
					{ where: { id: projectid } }
				);
				return res.json({ soc: soc });
			} else return next(apiError.forbidden('Недостаточно прав!'));
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Функция получения всех соц сетей
	 * @param {number} projectid - id проекта
	 */ // доступна всем

	async getSoc(req, res, next) {
		try {
			const { projectid } = req.query;
			if (!projectid) {
				return next(apiError.badRequest('Отсутствует projectid!'));
			}
			const socs = await SocNet.findAll({ where: { projectId: projectid } });
			return res.json({ socs: socs });
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Функция удаления социальной сети
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 * @param {number} socid - id соц сети
	 */ // доступна только с правами создателя/администратора

	async deleteSoc(req, res, next) {
		try {
			const { userid, projectid, socid } = req.body;
			if (!projectid || !socid) {
				return next(apiError.badRequest('Отсутствует projectid или socid!'));
			}
			const rule = await ruleController.getRules(userid, projectid);
			if (rule.superuser) {
				await SocNet.destroy({ where: { id: socid } });
				return res.json({ socs: 'Соцсеть удалена!' });
			} else return next(apiError.forbidden('Недостаточно прав!'));
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new socController();
