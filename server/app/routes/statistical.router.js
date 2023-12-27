module.exports = function (router) {
    var statisticalController = require('../controllers/statistical.controller');
    router.get('/statistical/info-all-motel/:id', statisticalController.info_all_motel);
    router.get('/statistical/info-motel/:id', statisticalController.info_motel);
    router.post('/statistical/all-in-out', statisticalController.all_in_out);
    router.post('/statistical/in-out', statisticalController.in_out);
    router.post(
        '/statistical/get-all-electric-water',
        statisticalController.get_all_electric_water
    );
    router.post('/statistical/get-electric-water', statisticalController.get_electric_water);
};
