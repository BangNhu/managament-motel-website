module.exports = function (router) {
    var servicesController = require('../controllers/services.controller');

    router.get('/services/list', servicesController.get_list);
    router.get('/services/detail/:id', servicesController.details);
    router.get('/services/list-by-landlord/:id', servicesController.list_by_landlord);
    router.get('/services/list-by-staff/:id', servicesController.list_by_staff);
    router.post('/services/add', servicesController.add_services);
    router.delete('/services/delete/:id', servicesController.remove_services);
    router.put('/services/update', servicesController.update_services);
};
