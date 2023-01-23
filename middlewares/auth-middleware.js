const tokenController = require('../controllers/tokenController');
const apiError = require('../error/apiError');

/**
     * Middleware для проверки токена
     * @param {string} authHeader - хедер с токеном
     * Проверяем токен и достаем из него id пользователя
     */

module.exports = function(req, res, next) {
    try {
        const authHeader = req.headers.authorization; // есть ли хедер
        if (!authHeader) return next(apiError.unauthorized('Отсутсвует header!'));
        const accessToken = authHeader.split(' ')[1]; // есть ли токен
        if (!accessToken) return next(apiError.unauthorized('Отсутсвует token!'));
        const userData = tokenController.validateAccess(accessToken); // валидируется ли он
        if (!userData) return next(apiError.unauthorized('Ошибка валидации!'));
        req.body.userid = userData.id; // возвращаем userID
        req.body.username = userData.name;
        next();
    } catch (error) {
        console.log(error);
    }
}