var Landlord = require('../models/landlord.model');

exports.get_list = function (req, res) {
    Landlord.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Landlord.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_landlord = function (req, res) {
    var data = req.body;

    Landlord.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_landlord = function (req, res) {
    var id = req.params.id;
    Landlord.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_landlord = function (req, res) {
    var data = req.body;
    Landlord.update(data, function (response) {
        res.send({ result: response });
    });
};
