const Router = require('express');
const router = new Router();
const userRouter = require('./userRoute');
const socRouter = require('./socRoute');
const themeRoter = require('./themeRoute');
const projectRouter = require('./projectRoute');
const postRouter = require('./postRoute');
const planRouter = require('./telegramRoute');
const commentRouter = require('./commentRoute');
<<<<<<< HEAD
const vkRouter = require('./vkRouter');
=======
const imgRouter = require('./imgRoute');
const patternRouter = require('./patternRoute');
>>>>>>> 2d156b8b9a5a4748687045ca378b7b5d5daddd7a

// здесь находятся только роуты, а конкрентно в index.js они собираются в один

router.use('/user', userRouter); // для userRoute
router.use('/soc', socRouter); // для socRoute и тд...
router.use('/theme', themeRoter);
router.use('/project', projectRouter);
router.use('/post', postRouter);
router.use('/telegram', planRouter);
router.use('/comment', commentRouter);
<<<<<<< HEAD
router.use('/vk', vkRouter);
=======
router.use('/img', imgRouter);
router.use('/pattern', patternRouter);
>>>>>>> 2d156b8b9a5a4748687045ca378b7b5d5daddd7a

module.exports = router;
