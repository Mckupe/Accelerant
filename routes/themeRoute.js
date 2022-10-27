const Router = require('express');
const router = new Router();
const themeController = require('../controllers/themeController');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, themeController.addTheme); // добавление новой темы
router.put('/update', authMiddleware, themeController.updateTheme); // изменение названия/цвета темы
router.delete('/delete', authMiddleware, themeController.deleteTheme); // удаление темы
router.get('/get', authMiddleware, themeController.getThemes); // получение всех тем

module.exports = router;