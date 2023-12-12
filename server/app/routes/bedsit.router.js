const { checkAuthorize } = require('../common/_AuthMiddleWare');
module.exports = function (router) {
    var bedsitController = require('../controllers/bedsit.controller');

    router.get('/bedsit/list', bedsitController.get_list);
    router.get('/bedsit/detail/:id', bedsitController.details);
    router.post(
        '/bedsit/add',
        checkAuthorize(['landlord', 'staff'], 10),
        bedsitController.add_bedsit
    );
    router.delete('/bedsit/delete/:id', bedsitController.remove_bedsit);
    router.put('/bedsit/update', bedsitController.update_bedsit);
};
