module.exports = function (router) {
    var block_motelController = require('../controllers/block_motel.controller');

    router.get('/block_motel/list', block_motelController.get_list);
    router.get('/block_motel/detail/:id', block_motelController.details);
    router.post('/block_motel/add', block_motelController.add_block_motel);
    router.delete('/block_motel/delete/:id', block_motelController.remove_block_motel);
    router.put('/block_motel/update', block_motelController.update_block_motel);
};
