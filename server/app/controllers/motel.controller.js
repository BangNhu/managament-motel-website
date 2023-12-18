var Motel = require('../models/motel.model');

exports.get_list = function (req, res) {
    Motel.get_all(function (response) {
        res.send({ result: response });
    });
};
exports.get_list_by_landlord = function (req, res) {
    Motel.get_all_by_landlord(req.params.id, function (response) {
        res.send({ result: response });
    });
};
exports.details = function (req, res) {
    Motel.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_motel = function (req, res) {
    var data = req.body;

    Motel.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_motel = function (req, res) {
    var id = req.params.id;
    Motel.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_motel = function (req, res) {
    var data = req.body;
    Motel.update(data, function (response) {
        res.send({ result: response });
    });
};
