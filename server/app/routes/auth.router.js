module.exports = function (router) {
    var authController = require('../controllers/auth.controller');
    router.post('/signup', authController.signup);
    router.post('/login', authController.login);
    router.post('/check-token', authController.check_token);
};
