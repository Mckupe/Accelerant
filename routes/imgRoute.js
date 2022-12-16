const Router = require('express');
const imgController = require('../controllers/imgController');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/upload', authMiddleware, imgController.uploadImg);
router.delete('/delete', authMiddleware, imgController.deleteImgs);

module.exports = router;
