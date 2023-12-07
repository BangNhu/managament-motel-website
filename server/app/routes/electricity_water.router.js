module.exports = function (router) {
    var electricityWaterController = require('../controllers/electricity_water.controller');

    router.get('/electricity_water/list', electricityWaterController.get_list);
    router.get('/electricity_water/detail/:id', electricityWaterController.details);
    router.post('/electricity_water/add', electricityWaterController.add_electricity_water);
    router.delete(
        '/electricity_water/delete/:id',
        electricityWaterController.remove_electricity_water
    );
    router.put('/electricity_water/update', electricityWaterController.update_electricity_water);
};
