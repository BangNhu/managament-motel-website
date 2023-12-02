var Contract = require('../models/contract.model');

exports.get_list = function (req, res) {
    Contract.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Contract.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_contract = function (req, res) {
    var data = req.body;

    Contract.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_contract = function (req, res) {
    var id = req.params.id;
    Contract.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_contract = function (req, res) {
    var data = req.body;
    Contract.update(data, function (response) {
        res.send({ result: response });
    });
};
