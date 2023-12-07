var BillDetails = require('../models/bill_details.model');

exports.get_list = function (req, res) {
    BillDetails.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    BillDetails.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_bill_details = function (req, res) {
    var data = req.body;

    BillDetails.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_bill_details = function (req, res) {
    var id = req.params.id;
    BillDetails.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_bill_details = function (req, res) {
    var data = req.body;
    BillDetails.update(data, function (response) {
        res.send({ result: response });
    });
};
