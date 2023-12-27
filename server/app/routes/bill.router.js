module.exports = function (router) {
    var billController = require('../controllers/bill.controller');

    router.get('/bill/list', billController.get_list);
    router.get('/bill/detail/:id', billController.details);
    router.get('/bill/get-list-tenant/:id', billController.get_list_tenant);
    router.get('/bill/get-old-new/:id', billController.get_old_new);
    router.get('/bill/get-price-bedsit/:id', billController.get_price_bedsit);
    router.get('/bill/get-service-bedsit/:id', billController.get_services_bedsit);
    router.post('/bill/add', billController.add_bill);
    router.delete('/bill/delete/:id', billController.remove_bill);
    router.put('/bill/update', billController.update_bill);
    router.post('/bill/create-pdf', billController.create_pdf);
    router.get('/bill/fetch-invoice-pdf', billController.fetch_invoice_pdf);
};
