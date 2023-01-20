const Router = require('express');
const vkContriller = require('../controllers/vkController');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/post', authMiddleware, vkContriller.post); // метод по публикации в вк
router.post('/send', authMiddleware, vkContriller.send); // отправка сообщений
router.get('/getStat', authMiddleware, vkContriller.getstat); // получение статистики для всех постов проекта
//router.get('/getOne', authMiddleware, vkContriller.getOnePost); // получение отдельного поста
//router.put('/update', authMiddleware, vkContriller.updatePost); // обновление поста
//router.delete('/delete', authMiddleware, vkContriller.deletePost); // удаление поста


module.exports = router;