const {SocNet} = require('../models/models');

class socController {
    async addSoc(req, res) {
        const {projectid, socnet, link, token} = req.body;
        const soc = await SocNet.create({socnet: socnet, link: link, token: token, projectId: projectid});
        res.json({soc: soc});
    }

    async getSoc(req, res) {
        const {projectid} = req.body;
        const socs = await SocNet.findAll({where: {projectId: projectid}});
        res.json({socs: socs});
    }

    async deleteSoc(req, res) {
        const {socid} = req.body;
        await SocNet.destroy({where: {id: socid}});
        res.json({socs: 'Соцсеть удалена!'});
    }
}

module.exports = new socController();