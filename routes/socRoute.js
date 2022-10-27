const Router = require('express');
const router = new Router();
const socController = require('../controllers/socController.js');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, socController.addSoc); // добавление соц сети
router.delete('/delete', authMiddleware, socController.deleteSoc); // удаление соц сети
router.get('/get', authMiddleware, socController.getSoc); // получение всех соц сетей

module.exports = router;