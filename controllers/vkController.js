const { Post, Img, SocNetList, ThemeList, SocNet, Theme } = require('../models/models');
const { VK } = require('vk-io');
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


class vkController {
    async post(req, res) {
        const { userid, text, img, time} = req.body;
        if (!text || !img) {
            return next(apiError.badRequest('Отсутствует сообщение или фотография'));
        }

        //const post = await Post.create({ text: text, time: time, draft: draft, talk: talk, plan: plan, projectId: projectid });
        // const soclist = await SocNetList.create({ postId: post.id, socnetId: socnetid });
        // const themelist = await ThemeList.create({ postId: post.id, themeId: themeid });
        //const imgs = await Img.create({ postId: post.id, img: img });
        //const imgs = ['https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', '123.jpg', 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg']
        const vk = new VK({ token: process.env.TOKEN });

        await Promise.all(imgs.map((img) => {
            return vk.upload.wallPhoto({
                source: {
                    value: img
                }
            })
        })
        )
            .then((attachment) =>
                vk.api.wall.post({
                    publish_date: time,//дату в формате unix Timestamp
                    message: text, //сообщение
                    attachment
                })
            );

        //res.json({ post: post });
    }

    async message(req, res) {
        const { userid, text, img, time, client} = req.body;
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