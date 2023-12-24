module.exports = function (router) {
    var electricityWaterController = require('../controllers/electricity_water.controller');

    router.get('/electricity-water/list', electricityWaterController.get_list);
    router.get('/electricity-water/detail/:id', electricityWaterController.details);
    router.get('/electricity-water/get-by-bedsit/:id', electricityWaterController.get_by_bedsit);
    router.post('/electricity-water/add', electricityWaterController.add_electricity_water);
    router.delete(
        '/electricity_water/delete/:id',
        electricityWaterController.remove_electricity_water
    );
    router.put('/electricity-water/update', electricityWaterController.update_electricity_water);
};
