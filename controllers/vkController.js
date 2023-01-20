const { Post, Img, SocNetList, ThemeList, SocNet, Theme } = require('../models/models');
const { VK } = require('vk-io');
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


class vkController {
    async getstat(req, res) {
        const { projectid } = req.body;
        const posts = await Post.findAll({ where: { projectId: projectid } });
        //const post = await Post.create({ text: text, time: time, draft: draft, talk: talk, plan: plan, projectId: projectid });
        // const soclist = await SocNetList.create({ postId: post.id, socnetId: socnetid });
        // const themelist = await ThemeList.create({ postId: post.id, themeId: themeid });
        //const imgs = await Img.create({ postId: post.id, img: img });
        //const imgs = ['https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', '123.jpg', 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg']
        const vk = new VK({ token: process.env.TOKEN });
        const statistic = {}
        const statictics = []
        await Promise.all(posts.map((post) => {
            post.socnetId.map(async socnetid => {
                const socnet = await SocNet.findOne({ where: { id: socnetid } });
                if (socnet.socnet === 'vk' && post.vkid) {
                    const vk = new VK({ token: process.env.TOKEN });
                    console.log(post.vkid)
                    statistic = await vk.api.wall.getById({
                        source: {
                            posts: post.vkid,
                            extended: 0,
                            copy_history_depth: 2
                        }
                    })
                    statictics.push({ postid: post.id, likes: statistic.response[0].likes.count, reposts: statistic.response[0].reposts.count, views: statistic.response[0].views.count })
                }
            })
        })
        )
        res.json({ statictics });
    }

    async post(req, res) {
        const { postid } = req.body;
        let imgs = await Img.findOne({ where: { postId: postid } });
        const post = await Post.findOne({ where: { id: postid } });
        let createdPost = {}
        let attachment = null
        post.socnetId.map(async socnetid => {
            const socnet = await SocNet.findOne({ where: { id: socnetid } });
            if (socnet.socnet === 'vk') {

                const vk = new VK({ token: socnet.token });
                const file = fs
                    .readFileSync(
                        path.resolve(
                            __dirname,
                            '../static',
                            'texts',
                            `${post.text}` + '.txt'
                        )
                    )
                    .toString();
                // if (!file || !imgs) {
                //     return next(apiError.badRequest("Не хватает текста или картинки"));//возможно лишняя проверка
                // }
                if (imgs) attachment = Promise.all(imgs.map((img) => {
                    return vk.upload.wallPhoto({
                        source: {
                            value: img
                        }
                    })
                })
                )
                createdPost = await vk.api.wall.post({
                    owner_id: socnet.link,
                    publish_date: post.time / 1000,//дату в формате unix Timestamp
                    message: file, //сообщение
                    attachment
                })
                await post.update({ published: true, vkid: socnet.link + "_" + (createdPost["post_id"] + 1) }, { where: { id: post.id } });
                console.log('Пост создан: id в vk: ' + createdPost["post_id"]);
            }
        });
        return res.json('Пост создан: id в vk: ' + createdPost["post_id"]);
    }

    async send(req, res) {
        const { userid, text, img, time, client } = req.body;
        if (!text || !img & !client) {
            return next(apiError.badRequest('Отсутствует сообщение, фотография или клиент'));
        }

        //const post = await Post.create({ text: text, time: time, draft: draft, talk: talk, plan: plan, projectId: projectid });
        // const soclist = await SocNetList.create({ postId: post.id, socnetId: socnetid });
        // const themelist = await ThemeList.create({ postId: post.id, themeId: themeid });
        //const imgs = await Img.create({ postId: post.id, img: img });
        //const imgs = ['https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', '123.jpg', 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg']
        const vk = new VK({ token: process.env.TOKEN });

        await Promise.all(imgs.map((img) => {
            return vk.upload.messagePhoto({
                source: {
                    value: img
                }
            })
        })
        )
            .then((attachment) =>
                vk.api.messages.send({
                    message: text, //сообщение
                    attachment,
                    peer_id: client,
                    random_id: Math.random() // id беседы
                })
            );
        //res.json({ post: post });
    }
}

module.exports = new vkController();