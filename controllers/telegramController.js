const {Post, SocNet} = require('../models/models');
const {Telegraf} = require('telegraf');
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');

class planController {
    checkPosts(req, res) {
        async function plan() {
            try {
                const posts = await Post.findAll({where: {plan: true}});
                posts.map(async (post) => {
                    if (post.plan) {
                        const plantime = Number(post.time) - Date.now();
                        post.socnetId.map(async (socid) => {
                            const socnet = await SocNet.findOne({where: {id: socid}});
                            if (socnet.socnet === 'telegram') {
                                const bot = new Telegraf(socnet.token);
                                if (plantime < 100000 && plantime > 0) {
                                    const file = fs.readFileSync(path.resolve(__dirname, '../static', 'texts', `${post.text}` + '.txt')).toString();
                                    await post.update({plan: false}, {where: {id: post.id}});
                                    new schedule.scheduleJob({ start: new Date(Date.now() + plantime), end: new Date(new Date(Date.now() + plantime + 1000)), rule: '*/1 * * * * *' }, function () {
                                        bot.telegram.sendMessage(socnet.link, file);
                                    });
                                }
                            } 
                        });
                    }
                })  
            } catch (error) {
                console.log(error);
            }
        }
        plan();
        setInterval(plan, 100000)
        return res.json('1')
    }
}

module.exports = new planController();