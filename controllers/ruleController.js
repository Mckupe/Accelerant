const { Project, Rules, ProjectUsers } = require('../models/models');
class ruleController {
	/**
	 * Функция полчуения прав пользователя для конкретного проетка
	 * @param {number} userid - id пользователя
	 * @param {number} projectid - id проекта
	 */

	async getRules(userid, projectid) {
		try {
			const puser = await ProjectUsers.findOne({
				where: { userId: userid, projectId: projectid },
			});
			const rule = await Rules.findOne({ where: { id: puser.ruleId } });
			return rule;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new ruleController();
