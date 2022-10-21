const Router = require('express');
const router = new Router();
const userRouter = require('./userRoute');
const socRouter = require('./socRoute');
const themeRoter = require('./themeRoute');
const projectRouter = require('./projectRoute');
const postRouter = require('./postRoute');
const planRouter = require('./planRoute');

// здесь находятся только роуты, а конкрентно в index.js они собираются в один

router.use('/user', userRouter); // для userRoute 
router.use('/soc', socRouter);
router.use('/theme', themeRoter);
router.use('/project', projectRouter);  
router.use('/post', postRouter);
router.use('/plan', planRouter);    


module.exports = router;