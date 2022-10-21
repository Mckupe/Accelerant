const {Post, Img, SocNetList, SocNet} = require('../models/models');
const {Telegraf} = require('telegraf');
const schedule = require('node-schedule');

class planController {
    async checkPosts(req, res) {
        setInterval(async () => {
            try {
                const posts = await Post.findAll({where: {plan: true}});
                posts.map(async (post) => {
                    if (post.plan) {
                        const plantime = Number(post.time) - Date.now();
                        const socnetid = await SocNetList.findOne({where: {postId: post.id}});
                        const socnet = await SocNet.findOne({where: {id: socnetid.socnetId}});
                        const bot = new Telegraf(socnet.token);
                        if (plantime < 600000 && plantime > 0) {
                            await post.update({plan: false}, {where: {id: post.id}});
                            new schedule.scheduleJob({ start: new Date(Date.now() + plantime), end: new Date(new Date(Date.now() + plantime + 1000)), rule: '*/1 * * * * *' }, function () {
                                bot.telegram.sendMessage(`@${socnet.link}`, post.text);
                            });
                        }
                    }
                })  
            } catch (error) {
                console.log(error);
            }
        }, 600000);
        res.json('1')
    }
}

module.exports = new planController();