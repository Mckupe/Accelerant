const Router = require('express');
const router = new Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, projectController.addProject);
router.post('/update', authMiddleware, projectController.updateProject);
router.post('/delete', authMiddleware, projectController.deleteProject);
router.get('/get', projectController.getProjects);

module.exports = router;