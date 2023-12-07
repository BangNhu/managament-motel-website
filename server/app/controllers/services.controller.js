var Services = require('../models/services.model');

exports.get_list = function (req, res) {
    Services.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Services.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_services = function (req, res) {
    var data = req.body;

    Services.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_services = function (req, res) {
    var id = req.params.id;
    Services.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_services = function (req, res) {
    var data = req.body;
    Services.update(data, function (response) {
        res.send({ result: response });
    });
};
