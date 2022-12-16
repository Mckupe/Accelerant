const apiError = require('../error/apiError');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

class imgController {
	async uploadImg(req, res, next) {
		const img = req.files.file;
		if (!img) {
			return next(apiError.badRequest('Отсутствует img!'));
		}
		const result = [];
		if (img.length === undefined) {
			const name = v4();
			await img.mv(
				path.resolve(`./static/imgs/${name}.${img.name.split('.')[1]}`),
				err => {
					if (err) console.log(err);
				}
			);
			result.push(`${name}.${img.name.split('.')[1]}`);
		} else {
			for (let i = 0; i < img.length; i++) {
				const name = v4();
				await img[i].mv(
					path.resolve(`./static/imgs/${name}.${img[i].name.split('.')[1]}`),
					err => {
						if (err) console.log(err);
					}
				);
				result.push(`${name}.${img[i].name.split('.')[1]}`);
			}
		}
		res.json({ imgs: result });
	}

	async deleteImgs(req, res, next) {
		const { imgs } = req.body;
		if (!imgs) {
			return next(apiError.badRequest('Отсутствует imgs!'));
		}
		for (let i = 0; i < imgs.length; i++) {
			fs.unlinkSync(
				path.resolve(__dirname, '../static', 'imgs', `${imgs[i]}`),
				() => {
					console.log('Файл удален!');
				}
			);
		}
		res.json('Файлы dsfdsfsdf	удалены.');
	}
}

module.exports = new imgController();
