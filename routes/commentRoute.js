const Router = require('express');
const commentController = require('../controllers/commentController');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, commentController.addComment); // добавление поста
router.get('/get', authMiddleware, commentController.getComments); // получение всех постов для конкретного проекта

module.exports = router;
