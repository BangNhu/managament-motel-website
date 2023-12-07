module.exports = function (router) {
    var checkOutController = require('../controllers/check_out.controller');

    router.get('/check_out/list', checkOutController.get_list);
    router.get('/check_out/detail/:id', checkOutController.details);
    router.post('/check_out/add', checkOutController.add_check_out);
    router.delete('/check_out/delete/:id', checkOutController.remove_check_out);
    router.put('/check_out/update', checkOutController.update_check_out);
};
