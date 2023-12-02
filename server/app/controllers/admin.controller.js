var Admin = require('../models/admin.model');

exports.get_list = function (req, res) {
    Admin.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Admin.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_admin = function (req, res) {
    var data = req.body;

    Admin.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_admin = function (req, res) {
    var id = req.params.id;
    Admin.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_admin = function (req, res) {
    var data = req.body;
    Admin.update(data, function (response) {
        res.send({ result: response });
    });
};
