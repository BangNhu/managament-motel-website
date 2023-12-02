module.exports = function (router) {
    var bedsitController = require('../controllers/bedsit.controller');

    router.get('/bedsit/list', bedsitController.get_list);
    router.get('/bedsit/detail/:id', bedsitController.details);
    router.post('/bedsit/add', bedsitController.add_bedsit);
    router.delete('/bedsit/delete/:id', bedsitController.remove_bedsit);
    router.put('/bedsit/update', bedsitController.update_bedsit);
};
