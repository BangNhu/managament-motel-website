var { Bedsit, BedsitService, BedsitTenant } = require('../models/bedsit.model');
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
////
exports.list_by_landlord = function (req, res) {
    Bedsit.get_bedsit_by_landlord(req.params.id, function (response) {
        res.send({ result: response });
    });
};
exports.list_by_staff = function (req, res) {
    Bedsit.get_bedsit_by_staff(req.params.id, function (response) {
        res.send({ result: response });
    });
};

exports.add_bedsit_service = function (req, res) {
    data = req.body;
    BedsitService.add_bedsit_service(data, function (response) {
        res.send({ result: response });
    });
};
exports.add_bedsit_tenant = function (req, res) {
    data = req.body;
    BedsitService.add_bedsit_tenant(data, function (response) {
        res.send({ result: response });
    });
};
