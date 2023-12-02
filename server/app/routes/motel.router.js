module.exports = function (router) {
    var motelController = require('../controllers/motel.controller');

    router.get('/motel/list', motelController.get_list);
    router.get('/motel/detail/:id', motelController.details);
    router.post('/motel/add', motelController.add_motel);
    router.delete('/motel/delete/:id', motelController.remove_motel);
    router.put('/motel/update', motelController.update_motel);
};
