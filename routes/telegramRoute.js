const Router = require('express');
const telegramController = require('../controllers/telegramController');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/check', authMiddleware, telegramController.checkPosts); // метод для отложенной публикации телеграм
router.post('/publish', authMiddleware, telegramController.publishNow);

module.exports = router;