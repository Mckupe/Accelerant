const {User, Project} = require('../models/models');

class projectController {
    async addProject(req, res) {
        const {userid, name} = req.body;
        const user = await User.findOne({where: {id: userid}});
        if (user) { 
            if (await Project.findOne({where: {name: name}})) { res.json({error: 'Проект с таким названием уже существует!'}); }
            else { 
                const project = await Project.create({userId: userid, name: name}); 
                res.json({ project: project });
            }
        } else {
            res.json('Пользователь не найден!');
        }
    }

    async getProjects(req, res) {
        const {userid} = req.body;
        const projects = await Project.findAll({where: {userId: userid}});
        res.json({projects: projects});
    }

    async updateProject(req, res) {
        const {projectid, text} = req.body;
        const project = await Project.update({name: text}, {where: {id: projectid}});
        res.json({project: project});
    }

    async deleteProject(req, res) {
        const {projectid} = req.body;
        await Project.destroy({where: {id: projectid}});
        res.json({project: 'Проект удален!'});
    }
}

module.exports = new projectController();