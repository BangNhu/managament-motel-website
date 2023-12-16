module.exports = function (router) {
    var staffController = require('../controllers/staff.controller');

    router.get('/staff/list', staffController.get_list);
    router.get('/staff/detail/:id', staffController.details);
    router.get('/staff/landlord/:id', staffController.get_staffs); //lấy ds staff với đk id landlord
    router.post('/staff/add', staffController.add_staff);
    router.delete('/staff/delete/:id', staffController.remove_staff);
    router.put('/staff/update', staffController.update_staff);
};
