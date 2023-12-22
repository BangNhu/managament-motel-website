var Tenant = require('../models/tenant.model');

exports.get_list = function (req, res) {
    Tenant.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Tenant.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_tenant = function (req, res) {
    var data = req.body;

    Tenant.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_tenant = function (req, res) {
    var id = req.params.id;
    Tenant.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_tenant = function (req, res) {
    var data = req.body;
    Tenant.update(data, function (response) {
        res.send({ result: response });
    });
};
////
exports.list_by_landlord = function (req, res) {
    Tenant.get_tenant_by_landlord(req.params.id, function (response) {
        res.send({ result: response });
    });
};
exports.list_by_staff = function (req, res) {
    Tenant.get_tenant_by_staff(req.params.id, function (response) {
        res.send({ result: response });
    });
};
