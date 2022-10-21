const {Theme} = require('../models/models');

class socController {
    async addTheme(req, res) {
        const {projectid, theme} = req.body;
        if (await Theme.findOne({where: {theme: theme}})) { 
            res.json({errror: 'Такая тема уже существует!'});
        }
        else { 
            const themebd = await Theme.create({theme: theme, projectId: projectid});
            res.json({themebd: themebd});
        }
    }

    async getThemes(req, res) {
        const {projectid} = req.body;
        const themes = await Theme.findAll({where: {projectId: projectid}});
        res.json({themes: themes});
    }

    async updateTheme(req, res) {
        const {themeid, text} = req.body;
        const theme = await Theme.update({theme: text}, {where: {id: themeid}});
        res.json({theme: theme});
    }

    async deleteTheme(req, res) {
        const {themeid} = req.body;
        await Theme.destroy({where: {id: themeid}});
        res.json({theme: 'Тема удалена!'});
    }
}

module.exports = new socController();