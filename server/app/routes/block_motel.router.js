const { checkAuthorize } = require('../common/_AuthMiddleWare');
module.exports = function (router) {
    var blockMotelController = require('../controllers/block_motel.controller');

    router.get('/block-motel/list', blockMotelController.get_list);
    router.get('/block_motel/detail/:id', blockMotelController.details);
    router.post(
        '/block_motel/add',
        checkAuthorize('staff', 7),
        blockMotelController.add_block_motel
    );
    router.get('/block-motel/list-by-landlord/:id', blockMotelController.list_by_landlord);
    router.get('/block-motel/list-by-staff/:id', blockMotelController.list_by_staff);
    router.post('/block-motel/add', blockMotelController.add_block_motel);
    router.delete('/block-motel/delete/:id', blockMotelController.remove_block_motel);
    router.put('/block-motel/update', blockMotelController.update_block_motel);
};
