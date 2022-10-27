const {Rules, ProjectUsers} = require('../models/models');

class ruleController {

    /**
     * Функция полчуения прав пользователя для конкретного проетка
     * @param {number} userid - id пользователя
     * @param {number} projectid - id проекта
     */

    async getRules(userid, projectid) {
        const puser = await ProjectUsers.findOne({where: {userId: userid, projectId: projectid}});
        const rule = await Rules.findOne({where: {id: puser.ruleId}});
        return rule;
    }
}

module.exports = new ruleController();