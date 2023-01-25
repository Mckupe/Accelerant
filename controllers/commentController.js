const { User, Comment } = require('../models/models');
const apiError = require('../error/apiError');

class commentController {
	async addComment(req, res, next) {
		try {
			const { userid, postid, text } = req.body;
			if (!postid || !text) {
				return next(apiError.badRequest('Отсутствует postid или text!'));
			}
			const user = await User.findOne({ where: { id: userid } });
			if (!user) return next(apiError.internal('Пользователь не найден!'));
			const comment = await Comment.create({
				text: text,
				postId: postid,
				userId: userid,
				nameCreator: user.username,
			});
			res.json('Комментарий добавлен!');
		} catch (error) {
			console.log(error);
		}
	}

	async getComments(req, res, next) {
		try {
			const { postid } = req.query;
			if (!postid) {
				return next(apiError.badRequest('Отсутствует postid!'));
			}
			const comments = await Comment.findAll({
				where: { postId: postid },
			});
			res.json({ comments: comments });
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new commentController();
