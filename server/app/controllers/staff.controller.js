var Staff = require('../models/staff.model');

exports.get_list = function (req, res) {
    Staff.get_all(function (data) {
        res.send({ result: data });
    });
};
exports.get_staffs = function (req, res) {
    Staff.getStaffsByLandlordId(req.params.id, function (response) {
        res.send({ result: response });
    });
};

exports.details = function (req, res) {
    Staff.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_staff = function (req, res) {
    var data = req.body;

    Staff.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_staff = function (req, res) {
    var id = req.params.id;
    Staff.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_staff = function (req, res) {
    var data = req.body;
    Staff.update(data, function (response) {
        res.send({ result: response });
    });
};

//phân quyền
exports.permission_list = function (req, res) {
    Staff.get_permission(req.params.id, function (response) {
        res.send({ result: response });
    });
};

exports.add_permission = function (req, res) {
    var data = req.body;
    Staff.add_staff_permission(data, function (response) {
        res.send({ result: response });
    });
};
exports.remove_permission = function (req, res) {
    var data = req.body;
    Staff.remove_staff_permission(data, function (response) {
        res.send({ result: response });
    });
};
