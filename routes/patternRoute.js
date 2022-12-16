const Router = require('express');
const patternController = require('../controllers/patternController');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/add', authMiddleware, patternController.addPattern);
router.get('/get', authMiddleware, patternController.getPatterns);
router.put('/update', authMiddleware, patternController.updatePattern);
router.delete('/delete', authMiddleware, patternController.deletePattern);

module.exports = router;
