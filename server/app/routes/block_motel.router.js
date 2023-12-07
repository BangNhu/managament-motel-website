const { checkAuthorize } = require('../common/_AuthMiddleWare');
module.exports = function (router) {
    var blockMotelController = require('../controllers/block_motel.controller');

    router.get('/block_motel/list', blockMotelController.get_list);
    router.get('/block_motel/detail/:id', blockMotelController.details);
    router.post(
        '/block_motel/add',
        checkAuthorize('staff', 11),
        blockMotelController.add_block_motel
    );
    router.delete('/block_motel/delete/:id', blockMotelController.remove_block_motel);
    router.put('/block_motel/update', blockMotelController.update_block_motel);
};
