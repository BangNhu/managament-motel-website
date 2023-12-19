module.exports = function (router) {
    var landlordController = require('../controllers/landlord.controller');

    router.get('/landlord/list', landlordController.get_list);
    router.get('/landlord/detail/:id', landlordController.details);
    router.post('/landlord/add', landlordController.add_landlord);
    router.delete('/landlord/delete/:id', landlordController.remove_landlord);
    router.put('/landlord/update', landlordController.update_landlord);
    router.put('/landlord/payment', landlordController.payment);
    router.post('/landlord/signup', landlordController.signup);
};
