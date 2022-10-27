const {Post, Comment} = require('../models/models');

class commentController {
    async addComment(req, res) {
        const {userid, postid, text} = req.body;
        const comment = Comment.create({comment: text, postId: postid, userId: userid});
    }

    async getComments(req, res) {
        const {postid} = req.body;
        const comments = await Comment.findAll({where: {postId: postid, userId: userid}});
    }
}