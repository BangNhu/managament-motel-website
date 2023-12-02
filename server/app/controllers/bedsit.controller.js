var Bedsit = require('../models/bedsit.model');

exports.get_list = function (req, res) {
    Bedsit.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Bedsit.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_bedsit = function (req, res) {
    var data = req.body;

    Bedsit.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_bedsit = function (req, res) {
    var id = req.params.id;
    Bedsit.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_bedsit = function (req, res) {
    var data = req.body;
    Bedsit.update(data, function (response) {
        res.send({ result: response });
    });
};
