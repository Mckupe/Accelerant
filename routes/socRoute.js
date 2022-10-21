const Router = require('express');
const router = new Router();
const socController = require('../controllers/socController.js');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, socController.addSoc);
router.post('/delete', authMiddleware, socController.deleteSoc);
router.get('/get', authMiddleware, socController.getSoc);

module.exports = router;