module.exports = function (router) {
    var billController = require('../controllers/bill.controller');

    router.get('/bill/list', billController.get_list);
    router.get('/bill/detail/:id', billController.details);
    router.post('/bill/add', billController.add_bill);
    router.delete('/bill/delete/:id', billController.remove_bill);
    router.put('/bill/update', billController.update_bill);
    router.post('/bill/create-pdf', billController.create_pdf);
    router.get('/bill/fetch-invoice-pdf', billController.fetch_invoice_pdf);
};
