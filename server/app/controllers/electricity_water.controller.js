var ElectricityWater = require('../models/electricity_water.model');

exports.get_list = function (req, res) {
    ElectricityWater.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    ElectricityWater.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};
exports.get_by_bedsit = function (req, res) {
    ElectricityWater.get_by_bedsit(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_electricity_water = function (req, res) {
    var data = req.body;

    ElectricityWater.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.add_electric_water_month = function (req, res) {
    var data = req.body;

    ElectricityWater.add_electric_water(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_electricity_water = function (req, res) {
    var id = req.params.id;
    ElectricityWater.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_electricity_water = function (req, res) {
    var data = req.body;
    ElectricityWater.update(data, function (response) {
        res.send({ result: response });
    });
};
