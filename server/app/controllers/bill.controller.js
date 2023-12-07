var Bill = require('../models/bill.model');

exports.get_list = function (req, res) {
    Bill.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Bill.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_bill = function (req, res) {
    var data = req.body;

    Bill.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_bill = function (req, res) {
    var id = req.params.id;
    Bill.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_bill = function (req, res) {
    var data = req.body;
    Bill.update(data, function (response) {
        res.send({ result: response });
    });
};
