module.exports = function (router) {
    var adminController = require('../controllers/admin.controller');

    router.get('/admin/list', adminController.get_list);
    router.get('/admin/detail/:id', adminController.details);
    router.post('/admin/add', adminController.add_admin);
    router.delete('/admin/delete/:id', adminController.remove_admin);
    router.put('/admin/update', adminController.update_admin);
};
