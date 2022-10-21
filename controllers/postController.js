const {Post, Img, SocNetList, ThemeList, SocNet, Theme} = require('../models/models');
const {Telegraf} = require('telegraf');
const schedule = require('node-schedule');

class postController {
    async addPost(req, res) {
        const {text, img, time, draft, talk, plan, socnetid, themeid, projectid} = req.body;
        const post = await Post.create({text: text, time: time, draft: draft, talk: talk, plan: plan, projectId: projectid});
        const soclist = await SocNetList.create({postId: post.id, socnetId: socnetid});
        const themelist = await ThemeList.create({postId: post.id, themeId: themeid});
        const imgs = await Img.create({postId: post.id, img: img});

        // const socnet = await SocNet.findOne({where: {id: socnetid}});
        // const plantime = Number(time) - Date.now();
        // const bot = new Telegraf(socnet.token);
        // new schedule.scheduleJob({ start: new Date(Date.now() + plantime), end: new Date(new Date(Date.now() + plantime + 1000)), rule: '*/1 * * * * *' }, function () {
        //     bot.telegram.sendMessage(`@${socnet.link}`, text);
        // });
        res.json({post: post});
    }

    // async getPosts(req, res) {
    //     const {projectid} = req.body;
    //     const posts = await Post.findAll({where: {projectId: projectid}});
    //     posts.map(async (post) => {
    //         const socnetid = await SocNetList.findAll({where: {postId: post.id}});
    //         const socnet = await SocNet.findOne({where: {id: socnetid.socnetId}});
    //         const themeid = await ThemeList.findOne({where: {postId: post.id}});
    //         const theme = await Theme.findOne({where: {id: themeid.themeId}});
    //         const img = await Img.findOne
    //     })

    // }
}

module.exports = new postController();