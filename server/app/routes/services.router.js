module.exports = function (router) {
    var servicesController = require('../controllers/services.controller');

    router.get('/services/list', servicesController.get_list);
    router.get('/services/detail/:id', servicesController.details);
    router.post('/services/add', servicesController.add_services);
    router.delete('/services/delete/:id', servicesController.remove_services);
    router.put('/services/update', servicesController.update_services);
};
