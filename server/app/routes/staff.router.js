module.exports = function (router) {
    var staffController = require('../controllers/staff.controller');

    router.get('/staff/list', staffController.get_list);
    router.get('/staff/detail/:id', staffController.details);
    router.post('/staff/add', staffController.add_staff);
    router.delete('/staff/delete/:id', staffController.remove_staff);
    router.put('/staff/update', staffController.update_staff);
};
