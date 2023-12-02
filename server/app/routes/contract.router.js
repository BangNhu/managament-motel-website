module.exports = function (router) {
    var contractController = require('../controllers/contract.controller');

    router.get('/contract/list', contractController.get_list);
    router.get('/contract/detail/:id', contractController.details);
    router.post('/contract/add', contractController.add_contract);
    router.delete('/contract/delete/:id', contractController.remove_contract);
    router.put('/contract/update', contractController.update_contract);
};
