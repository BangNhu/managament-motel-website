const { checkAuthorize } = require('../common/_AuthMiddleWare');
module.exports = function (router) {
    var bedsitController = require('../controllers/bedsit.controller');

    router.get('/bedsit/list', bedsitController.get_list);
    router.get('/bedsit/detail/:id', bedsitController.details);
    router.get('/bedsit/list-by-landlord/:id', bedsitController.list_by_landlord);
    router.get('/bedsit/list-by-staff/:id', bedsitController.list_by_staff);
    router.post('/bedsit/add', bedsitController.add_bedsit);
    router.post('/bedsit/add-bedsit-service', bedsitController.add_bedsit_service);
    router.post('/bedsit/add-bedsit-tenant', bedsitController.add_bedsit_tenant);
    router.delete('/bedsit/delete/:id', bedsitController.remove_bedsit);
    router.put('/bedsit/update', bedsitController.update_bedsit);
};
