const { User, Project, Rules, ProjectUsers } = require('../models/models');
const ruleController = require('./ruleController');
const apiError = require('../error/apiError');

class projectController {
	/**
	 * Функция добавления проекта
	 * @param {number} userid - id пользователя
	 * @param {string} name - название проекта
	 */ // доступна всем

	async addProject(req, res, next) {
		const { userid, username, name } = req.body;
		if (!name) {
			return next(apiError.badRequest('Введите название проекта!'));
		}
		const user = await User.findOne({ where: { id: userid } });
		const projectUsers = await ProjectUsers.findAll({
			where: { userId: userid },
		});

		if (user) {
			for (let i = 0; i < projectUsers.length; i++) {
				if (
					await Project.findOne({
						where: { id: projectUsers[i].projectId, name: name },
					})
				) {
					return next(
						apiError.badRequest('Проект с таким названием уже существует!')
					);
				}
			}
			const project = await Project.create({
				name: name,
				nameCreator: username,
				arraySoc: [],
				favorit: false,
			});
			const rule = await Rules.create({
				readAndCreateDraft: true,
				readTalkAndPlan: true,
				anal: true,
				createAndUpdatePlan: true,
				talkToPlan: true,
				superuser: true,
			});
			await ProjectUsers.create({
				userId: userid,
				projectId: project.id,
				ruleId: rule.id,
			});
			return res.json({ projectid: project.id });
		} else {
			return next(apiError.internal('Пользователь не найден!'));
		}
	}

	/**
	 * Функция получения всех проектов
	 * @param {number} userid - id пользователя
	 */ // доступна всем

	async getProjects(req, res) {
		const { userid } = req.body;
		const pusers = await ProjectUsers.findAll({ where: { userId: userid } });
		const projects = [];
		for (let i = 0; i < pusers.length; i++) {
			const project = await Project.findOne({
				where: { id: pusers[i].projectId },
			});
			projects.push(project);
		}
		return res.json({ projects: projects });
	}

	/**
	 * Функция изменения названия проекта
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 * @param {string} name - название проекта
	 */ // доступна только с правами создателя/администратора

	async update(req, res, next) {
		const { userid, projectid, name, favorit } = req.body;
		if (!projectid || !name) {
			return next(apiError.badRequest('Отсутсвует projecid или name!'));
		}
		const project = await Project.findOne({ where: { id: projectid } });
		if (!project) return next(apiError.internal('Проект не найден.')); 
		const rule = await ruleController.getRules(userid, projectid);
		if (rule.superuser) {
			const project = await Project.update(
				{ name: name, favorit: favorit },
				{ where: { id: projectid } }
			);
			return res.json({ project: project });
		} else return next(apiError.forbidden('Недостаточно прав!'));
	}

	/**
	 * Функция удаления проекта
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 */ // доступна только с правами создателя/администратора

	async deleteProject(req, res, next) {
		const { userid, projectid } = req.body;
		if (!projectid) {
			return next(apiError.badRequest('Отсутсвует projecid!'));
		}
		const project = await Project.findOne({ where: { id: projectid } });
		if (!project) return next(apiError.internal('Проект не найден.')); 
		const rule = await ruleController.getRules(userid, projectid);
		if (rule.superuser) {
			await Project.destroy({ where: { id: projectid } });
			return res.json({ project: 'Проект удален!' });
		} else return next(apiError.forbidden('Недостаточно прав!'));
	}

	/**
	 * Функция добавления нового пользователя в проект
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 * @param {boolean} readAndCreateDraft - доступ к чтению и созданию черновиков
	 * @param {boolean} readTalkAndPlan - доступ к чтению обсуждений и запланированных публикаций
	 * @param {boolean} anal - доступ к аналитике проекта
	 * @param {boolean} createAndUpdatePlan - доступ к созданию и обновлению запланированных публикаций
	 * @param {boolean} talkToPlan - доступ к утверждению публикаций
	 * @param {boolean} superuser - администратор
	 */ // доступна только с правами создателя/администратора

	async addUser(req, res, next) {
		const {
			userid,
			projectid,
			readAndCreateDraft,
			readTalkAndPlan,
			anal,
			createAndUpdatePlan,
			talkToPlan,
			superuser,
		} = req.body;
		if (
			!projectid ||
			!readAndCreateDraft ||
			!readTalkAndPlan ||
			!anal ||
			!createAndUpdatePlan ||
			!talkToPlan ||
			!superuser
		) {
			return next(
				apiError.badRequest('Отсутсвует какой-либо из параметров доступа!')
			);
		}
		const project = await Project.findOne({ where: { id: projectid } });
		if (!project) return next(apiError.internal('Проект не найден.')); 
		const rule = await ruleController.getRules(userid, projectid);
		if (rule.superuser) {
			const rule = await Rules.create({
				readAndCreateDraft: readAndCreateDraft,
				readTalkAndPlan: readTalkAndPlan,
				anal: anal,
				createAndUpdatePlan: createAndUpdatePlan,
				talkToPlan: talkToPlan,
				superuser: superuser,
			});
			await ProjectUsers.create({
				userId: userid,
				projectId: projectid,
				ruleId: rule.id,
			});
			return res.json('Пользователь добавлен!');
		} else return next(apiError.forbidden('Недостаточно прав!'));
	}
}

module.exports = new projectController();
