const Router = require('express');
const router = new Router();
const themeController = require('../controllers/themeController');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, themeController.addTheme);
router.post('/update', authMiddleware, themeController.updateTheme);
router.post('/delete', authMiddleware, themeController.deleteTheme);
router.get('/get', themeController.getThemes);

module.exports = router;