const Router = require('express');
const router = new Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, projectController.addProject); // создание нового проекта
router.put('/update', authMiddleware, projectController.updateName); // изменение названия проекта
router.delete('/delete', authMiddleware, projectController.deleteProject); // удаление проекта
router.get('/get', authMiddleware, projectController.getProjects); // получение всех проектов

module.exports = router;