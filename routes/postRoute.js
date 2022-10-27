const Router = require('express');
const postController = require('../controllers/postController');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, postController.addPost); // добавление поста
router.get('/getAll', authMiddleware, postController.getPosts); // получение всех постов для конкретного проекта
router.get('/getOne', authMiddleware, postController.getOnePost); // получение отдельного поста
router.put('/update', authMiddleware, postController.updatePost); // обновление поста
router.delete('/delete', authMiddleware, postController.deletePost); // удаление поста


module.exports = router;