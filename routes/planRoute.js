const Router = require('express');
const planController = require('../controllers/planController');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/check', authMiddleware, planController.checkPosts);

module.exports = router;