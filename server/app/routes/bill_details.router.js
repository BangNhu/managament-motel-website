module.exports = function (router) {
    var BillDetailsController = require('../controllers/bill_details.controller');

    router.get('/bill_details/list', BillDetailsController.get_list);
    router.get('/bill_details/detail/:id', BillDetailsController.details);
    router.post('/bill_details/add', BillDetailsController.add_bill_details);
    router.delete('/bill_details/delete/:id', BillDetailsController.remove_bill_details);
    router.put('/bill_details/update', BillDetailsController.update_bill_details);
};
