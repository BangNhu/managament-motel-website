module.exports = function (router) {
    var loginController = require('../controllers/auth.controller');

    router.post('/login', loginController.login);
};
