const Router = require('express');
const postController = require('../controllers/postController');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, postController.addPost);

module.exports = router;