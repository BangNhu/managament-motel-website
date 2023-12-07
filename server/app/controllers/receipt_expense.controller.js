var ReceiptExpense = require('../models/receipt_expense.model');

exports.get_list = function (req, res) {
    ReceiptExpense.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    ReceiptExpense.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_receipt_expense = function (req, res) {
    var data = req.body;

    ReceiptExpense.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_receipt_expense = function (req, res) {
    var id = req.params.id;
    ReceiptExpense.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_receipt_expense = function (req, res) {
    var data = req.body;
    ReceiptExpense.update(data, function (response) {
        res.send({ result: response });
    });
};
