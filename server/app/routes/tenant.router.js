module.exports = function (router) {
    var tenantController = require('../controllers/tenant.controller');

    router.get('/tenant/list', tenantController.get_list);
    router.get('/tenant/detail/:id', tenantController.details);
    router.post('/tenant/add', tenantController.add_tenant);
    router.delete('/tenant/delete/:id', tenantController.remove_tenant);
    router.put('/tenant/update', tenantController.update_tenant);
};
