const Router = require('express');
const router = new Router();
const userRouter = require('./userRoute');

// здесь находятся только роуты, а конкрентно в index.js они собираются в один

router.use('/user', userRouter); // для userRoute 


module.exports = router;