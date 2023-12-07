var CheckOut = require('../models/check_out.model');

exports.get_list = function (req, res) {
    CheckOut.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    CheckOut.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_check_out = function (req, res) {
    var data = req.body;

    CheckOut.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_check_out = function (req, res) {
    var id = req.params.id;
    CheckOut.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_check_out = function (req, res) {
    var data = req.body;
    CheckOut.update(data, function (response) {
        res.send({ result: response });
    });
};
