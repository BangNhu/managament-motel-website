module.exports = function (router) {
    var authController = require('../controllers/auth.controller');
    router.post('/signup', authController.signup);
    router.post('/login', authController.login);
    router.post('/check-token', authController.check_token);
    router.post('/verify-email', authController.verify_email);
    router.post('/forgot-password', authController.forgot_password);
    router.post('/reset-password', authController.reset_password);
};
