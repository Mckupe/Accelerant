const Router = require('express');
const router = new Router();
const userRouter = require('./userRoute');
const socRouter = require('./socRoute');
const themeRoter = require('./themeRoute');
const projectRouter = require('./projectRoute');
const postRouter = require('./postRoute');
const planRouter = require('./telegramRoute');
const commentRouter = require('./commentRoute');
const imgRouter = require('./imgRoute');
const patternRouter = require('./patternRoute');

// здесь находятся только роуты, а конкрентно в index.js они собираются в один

router.use('/user', userRouter); // для userRoute
router.use('/soc', socRouter); // для socRoute и тд...
router.use('/theme', themeRoter);
router.use('/project', projectRouter);
router.use('/post', postRouter);
router.use('/telegram', planRouter);
router.use('/comment', commentRouter);
router.use('/img', imgRouter);
router.use('/pattern', patternRouter);

module.exports = router;
