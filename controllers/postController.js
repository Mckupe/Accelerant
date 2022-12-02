const { Post, Img } = require('../models/models');
const fs = require('fs');
const path = require('path');
const apiError = require('../error/apiError');
const ruleController = require('./ruleController');

class postController {
	/**
	 * Функция добавления проекта
	 * @param {number} projectid - id пользователя
	 * @param {string} text - текст поста
	 * @param {Array[string]} img - массив названий изображений
	 * @param {string} time - время публикации поста
	 * @param {boolean} draft - черновик?
	 * @param {boolean} talk - обсуждние?
	 * @param {boolean} plan - запланирован?
	 * @param {Array[number]} socnetid - массив id соцсетей
	 * @param {Array[number]} themeid - массив id тем
	 */ // доступна в зависимоти от типа поста

	async addPost(req, res, next) {
		const {
			userid,
			text,
			img,
			time,
			draft,
			talk,
			plan,
			socnetid,
			themeid,
			projectid,
			nameCreator,
		} = req.body;
		console.log(text, time, socnetid, themeid, projectid, nameCreator);
		if (!projectid || !time || !socnetid || !themeid || !nameCreator) {
			return next(
				apiError.badRequest(
					'Отсутствует projectid, nameCreator, text, time, draft, talk, plan, socnetid или themeid!'
				)
			);
		}
		const rule = await ruleController.getRules(userid, projectid);
		let necrule;
		if (draft) necrule = rule.readAndCreateDraft;
		if (talk) necrule = rule.createAndUpdatePlan;
		if (plan) necrule = rule.createAndUpdatePlan;
		if (necrule) {
			const nameText = Date.now().toString();
			fs.writeFileSync(
				path.resolve(__dirname, '../static', 'texts', `${nameText}` + '.txt'),
				text
			);
			const post = await Post.create({
				text: nameText,
				time: time,
				draft: draft,
				talk: talk,
				plan: plan,
				projectId: projectid,
				socnetId: socnetid,
				themeId: themeid,
				nameCreator: nameCreator,
			});
			if (img) await Img.create({ postId: post.id, img: img });
			return res.json({ post: post });
		} else return next(apiError.forbidden('Недостаточно прав!'));
	}

	/**
	 * Функция получение постов проекта
	 * @param {number} projectid - id пользователя
	 * @param {boolean} draft - черновик?
	 * @param {boolean} talk - обсуждние?
	 * @param {boolean} plan - запланирован?
	 */ // доступна в зависимоти от типа поста

	async getPosts(req, res, next) {
		const { userid } = req.body;
		const { projectid, draft, talk, plan } = req.query;
		if (!projectid) {
			return next(apiError.badRequest('Отсутствует projectid!'));
		}
		const rule = await ruleController.getRules(userid, projectid);
		let necrule;
		if (draft === 'true') necrule = rule.readAndCreateDraft;
		if (talk === 'true') necrule = rule.readTalkAndPlan;
		if (plan === 'true') necrule = rule.createAndUpdatePlan;
		if (necrule) {
			let posts;
			if (draft === 'true') {
				console.log('AAAAAAAaaa');
				posts = await Post.findAll({
					where: { draft: true, projectId: projectid },
				});
			} else if (talk === 'true') {
				posts = await Post.findAll({
					where: { talk: true, projectId: projectid },
				});
			} else {
				posts = await Post.findAll({
					where: { plan: true, projectId: projectid },
				});
			}
			const respons = [];
			for (let i = 0; i < posts.length; i++) {
				let img = await Img.findOne({ where: { postId: posts[i].id } });
				if (!img) img = { img: [] };
				const file = fs
					.readFileSync(
						path.resolve(
							__dirname,
							'../static',
							'texts',
							`${posts[i].text}` + '.txt'
						)
					)
					.toString();
				respons.push({
					post: posts[i],
					text: file,
					img: img.img,
				});
			}
			return res.json({ posts: respons });
		} else return next(apiError.forbidden('Недостаточно прав!'));
	}

	/**
	 * Функция получения отдельного поста
	 * @param {number} postid - id поста
	 */ // доступна в зависимоти от типа поста

	async getOnePost(req, res, next) {
		const { postid } = req.query;
		if (!postid) {
			return next(apiError.badRequest('Отсутствует postid!'));
		}
		const post = await Post.findOne({ where: { id: postid } });
		let img = await Img.findOne({ where: { postId: post.id } });
		if (!img) img = { img: [] };
		const file = fs
			.readFileSync(
				path.resolve(__dirname, '../static', 'texts', `${post.text}` + '.txt')
			)
			.toString();
		const response = {
			post: post,
			text: file,
			img: img.img,
		};
		return res.json({ posts: response });
	}

	/**
	 * Функция обновления поста
	 * @param {number} postid - id пользователя
	 * @param {string} text - текст поста
	 * @param {Array[string]} img - массив названий изображений
	 * @param {string} time - время публикации поста
	 * @param {boolean} draft - черновик?
	 * @param {boolean} talk - обсуждние?
	 * @param {boolean} plan - запланирован?
	 * @param {Array[number]} socnetid - массив id соцсетей
	 * @param {Array[number]} themeid - массив id тем
	 */ // доступна в зависимоти от типа поста

	async updatePost(req, res, next) {
		const {
			userid,
			postid,
			text,
			img,
			time,
			draft,
			talk,
			plan,
			socnetid,
			themeid,
			projectid,
		} = req.body;
		if (!postid || !text || !time || !socnetid || !themeid) {
			return next(
				apiError.badRequest(
					'Отсутствует postid, text, time, draft, talk, plan, socnetid или themeid!'
				)
			);
		}
		const rule = await ruleController.getRules(userid, projectid);
		let necrule;
		if (draft) necrule = rule.readAndCreateDraft;
		if (talk) necrule = rule.readTalkAndPlan;
		if (plan) necrule = rule.createAndUpdatePlan;
		if (necrule) {
			const post = await Post.findOne({ where: { id: postid } });
			fs.writeFileSync(
				path.resolve(__dirname, '../static', 'texts', `${post.text}` + '.txt'),
				text
			);
			const imgbd = await Img.findOne({ where: { postId: post.id } });
			if (imgbd) await Img.update({ img: img }, { where: { postId: post.id } });
			else await Img.create({ postId: post.id, img: img });
			await Post.update(
				{
					time: time,
					draft: draft,
					talk: talk,
					plan: plan,
					socnetId: socnetid,
					themeId: themeid,
				},
				{ where: { id: post.id } }
			);
			return res.json('Пост обновлен!');
		} else return next(apiError.forbidden('Недостаточно прав!'));
	}

	/**
	 * Функция удаления поста
	 * @param {number} postid - id поста
	 */ // доступна в зависимоти от типа поста

	async deletePost(req, res, next) {
		const { postid } = req.body;
		if (!postid) {
			return next(apiError.badRequest('Отсутствует postid!'));
		}
		const post = await Post.findOne({ where: { id: postid } });
		const imgs = await Img.findOne({ where: { postId: post.id } });
		fs.unlinkSync(
			path.resolve(__dirname, '../static', 'texts', `${post.text}` + '.txt'),
			() => {
				console.log('Файл удален!');
			}
		);
		if (imgs) {
			for (let i = 0; i < imgs.img.length; i++) {
				fs.exists(
					path.resolve(__dirname, '../static', 'imgs', `${imgs[i]}`),
					exists => {
						if (exists) {
							fs.unlinkSync(
								path.resolve(__dirname, '../static', 'imgs', `${imgs.img[i]}`),
								() => {
									console.log('Файл удален!');
								}
							);
						}
					}
				);
			}
		}
		await Img.destroy({ where: { postId: post.id } });
		await Post.destroy({ where: { id: postid } });
		return res.json('Пост удален!');
	}
}

module.exports = new postController();
