const { checkAuthorize } = require('../common/_AuthMiddleWare');
module.exports = function (router) {
    var motelController = require('../controllers/motel.controller');

    router.get('/motel/list', motelController.get_list);
    router.get('/motel/detail/:id', motelController.details);
    router.get('/motel/list-by-landlord/:id', motelController.get_list_by_landlord);
    router.post('/motel/add', checkAuthorize('landlord'), motelController.add_motel);
    router.delete('/motel/delete/:id', checkAuthorize('landlord'), motelController.remove_motel);
    router.put('/motel/update', checkAuthorize('landlord'), motelController.update_motel);
};
