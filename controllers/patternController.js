const { User, Pattern } = require('../models/models');
const apiError = require('../error/apiError');
const fs = require('fs');
const path = require('path');

class patternController {
	async addPattern(req, res, next) {
		const { userid, name, text } = req.body;
		if (!name || !text) {
			return next(apiError.badRequest('Отсутствует name или text!'));
		}
		const user = await User.findOne({ where: { id: userid } });
		if (!user) return next(apiError.internal('Пользователь не найден!'));
		const namePattern = name + '_' + Date.now().toString();
		fs.writeFileSync(
			path.resolve(
				__dirname,
				'../static',
				'patterns',
				`${namePattern}` + '.txt'
			),
			text
		);
		const pattern = await Pattern.create({
			text: namePattern,
			name: name,
			userId: userid,
		});
		return res.json({ pattern: pattern });
	}

	async updatePattern(req, res, next) {
		const { patternid, name, nameText, text } = req.body;
		if (!name || !text) {
			return next(apiError.badRequest('Отсутствует name или text!'));
		}
		fs.writeFileSync(
			path.resolve(__dirname, '../static', 'patterns', `${nameText}` + '.txt'),
			text
		);
		await Pattern.update(
			{
				name: name,
			},
			{ where: { id: patternid } }
		);
		return res.json('Шаблон обновлен.');
	}

	async getPatterns(req, res, next) {
		const { userid } = req.body;
		if (!userid) {
			return next(apiError.badRequest('Отсутствует userid!'));
		}
		const result = [];
		const patterns = await Pattern.findAll({
			where: { userId: userid },
		});
		for (let i = 0; i < patterns.length; i++) {
			const text = fs
				.readFileSync(
					path.resolve(
						__dirname,
						'../static',
						'patterns',
						`${patterns[i].text}` + '.txt'
					)
				)
				.toString();
			result.push({
				id: patterns[i].id,
				name: patterns[i].text.split('_')[0],
				nameText: patterns[i].text,
				text: text,
				userId: patterns[i].userId,
			});
		}
		res.json({ patterns: result });
	}

	async deletePattern(req, res, next) {
		const { patternid } = req.body;
		if (!patternid) {
			return next(apiError.badRequest('Отсутствует name или patternid!'));
		}
		const pattern = await Pattern.findOne({where: {id: patternid}});
		fs.unlinkSync(
			path.resolve(__dirname, '../static', 'patterns', `${pattern.text}` + '.txt'),
			() => {
				console.log('Файл удален!');
			}
		);
		await Pattern.destroy({where: {id: patternid}});
		return res.json('Шаблон удален.');
	}
}

module.exports = new patternController();
