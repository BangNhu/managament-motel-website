module.exports = function (router) {
    var temporaryResidenceController = require('../controllers/temporary_residence.controller');

    router.get('/temporary_residence/list', temporaryResidenceController.get_list);
    router.get('/temporary_residence/detail/:id', temporaryResidenceController.details);
    router.post('/temporary_residence/add', temporaryResidenceController.add_temporary_residence);
    router.delete(
        '/temporary_residence/delete/:id',
        temporaryResidenceController.remove_temporary_residence
    );
    router.put(
        '/temporary_residence/update',
        temporaryResidenceController.update_temporary_residence
    );
};
