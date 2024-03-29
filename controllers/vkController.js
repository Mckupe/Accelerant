const { Post, Img, SocNet } = require('../models/models');
const apiError = require('../error/apiError');
const { VK } = require('vk-io');
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class vkController {
	async getstat(req, res) {
		try {
			const { projectid } = req.query;
			const posts = await Post.findAll({ where: { projectId: projectid } });
			const respons = [];
			for (let i = 0; i < posts.length; i++) {
				for (let j = 0; j < posts[i].socnetId.length; j++) {
					let socnet = await SocNet.findOne({ where: { id: posts[i].socnetId[j] } });
					if (socnet.socnet === "vk") {
						const vk = new VK({ token: socnet.token });
						const statistic = await vk.api.wall.getById({
							posts: posts[i].vkid,
							extended: 0,
							copy_history_depth: 2
						});
						respons.push(statistic[0]);
					}
				}
			}
			res.json({ respons });
		} catch (error) {
			console.log(error);
		}
	}

	async post(req, res, next) {
		try {
			const { postid } = req.body;
			let imgs = await Img.findOne({ where: { postId: postid } });
			const post = await Post.findOne({ where: { id: postid } });
			let postId = 0;
			let isgood = true;
			let data = {};
			post.socnetId.map(async socnetid => {
				const socnet = await SocNet.findOne({ where: { id: socnetid } });
				if (socnet.socnet === 'vk') {
					const vk = new VK({ token: socnet.token });
					const statistic = await vk.api.wall.get({ owner_id: socnet.link, filter: "postponed" });
					statistic.items.map((item) => { if (+item.date === +post.time / 1000) { isgood = false; } })
					if (!isgood) {
						post.destroy()
						return next(apiError.badRequest('Пост с этим временем публикации уже существует!'))
					}
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
					if (post.time > Date.now()) {
						data = {
							owner_id: socnet.link,
							publish_date: post.time / 1000,
							message: file
						}
						postId++;
					}
					else {
						data = {
							owner_id: socnet.link,
							message: file, //сообщение
						}
					};
					if (imgs) {
						await Promise.all(
							imgs.img.map((img) => {
								return vk.upload.wallPhoto({
									source: {
										value: `http://localhost:5000/static/imgs/${img}`,
									},
								});
							})
						).then(async (attachment) => {
							const createdPost = await vk.api.wall.post({ ...data, attachment });
							postId += createdPost['post_id']
						})
					}
					else {
						const createdPost = await vk.api.wall.post(data);
						postId += createdPost['post_id']
					}
					await post.update(
						{
							published: true,
							vkid: socnet.link + '_' + postId,
						},
						{ where: { id: post.id } }
					);
					console.log('Пост создан: id в vk: ' + postId);
					return res.json('Пост создан: id в vk');
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	async send(req, res) {
		try {
			const { userid, text, img, time, client } = req.body;
			if (!text || !img & !client) {
				return next(
					apiError.badRequest('Отсутствует сообщение, фотография или клиент')
				);
			}

			const vk = new VK({ token: process.env.TOKEN });

			await Promise.all(
				imgs.map(img => {
					return vk.upload.messagePhoto({
						source: {
							value: img,
						},
					});
				})
			).then(attachment =>
				vk.api.messages.send({
					message: text, //сообщение
					attachment,
					peer_id: client,
					random_id: Math.random(), // id беседы
				})
			);
			res.json({ post: post });
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new vkController();