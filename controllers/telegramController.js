const { Post, SocNet, Img } = require('../models/models');
const { Telegraf } = require('telegraf');
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');

class planController {
	checkPosts(req, res) {
		async function plan() {
			try {
				console.log('check');
				const posts = await Post.findAll({ where: { published: false } });
				posts.map(async post => {
					if (post.plan) {
						const plantime = Number(post.time) - Date.now();
						post.socnetId.map(async socid => {
							const socnet = await SocNet.findOne({ where: { id: socid } });
							if (socnet.socnet === 'telega') {
								const bot = new Telegraf(socnet.token);
								if (plantime < 100000 && plantime > 0) {
									const img = await Img.findOne({ where: { postId: post.id } });
									console.log(img);
									if (!img) {
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
										await post.update(
											{ published: true },
											{ where: { id: post.id } }
										);
										new schedule.scheduleJob(
											{
												start: new Date(Date.now() + plantime),
												end: new Date(new Date(Date.now() + plantime + 1000)),
												rule: '*/1 * * * * *',
											},
											function () {
												bot.telegram.sendMessage(socnet.link, file);
											}
										);
									} else {
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
										const imgs = img.img;
										const media = [];
										for (let i = 0; i < imgs.length; i++) {
											media.push({
												type: 'photo',
												media: `http://localhost:5000/static/imgs/${imgs[i]}`,
											});
										}
										await post.update(
											{ plan: false },
											{ where: { id: post.id } }
										);
										new schedule.scheduleJob(
											{
												start: new Date(Date.now() + plantime),
												end: new Date(new Date(Date.now() + plantime + 1000)),
												rule: '*/1 * * * * *',
											},
											function () {
												bot.telegram.sendMediaGroup(socnet.link, media);
												bot.telegram.sendMessage(socnet.link, file);
											}
										);
									}
								}
							}
						});
					}
				});
			} catch (error) {
				console.log(error);
			}
		}
		plan();
		setInterval(plan, 100000);
		return res.json('1');
	}

	async publishNow(req, res) {
		const { postid } = req.body;
		const post = await Post.findOne({ where: { id: postid } });
		post.socnetId.map(async socnetid => {
			const socnet = await SocNet.findOne({ where: { id: socnetid } });
			if (socnet.socnet === 'telega') {
				const bot = new Telegraf(socnet.token);
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
				await post.update({ published: true }, { where: { id: post.id } });
				console.log('213123213');
				await bot.telegram.sendMessage(socnet.link, file);
			}
		});
		return res.json('Пост опубликован.');
	}
}

module.exports = new planController();
