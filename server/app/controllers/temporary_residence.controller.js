var TemporaryResidence = require('../models/temporary_residence.model');

exports.get_list = function (req, res) {
    TemporaryResidence.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    TemporaryResidence.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_temporary_residence = function (req, res) {
    var data = req.body;

    TemporaryResidence.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_temporary_residence = function (req, res) {
    var id = req.params.id;
    TemporaryResidence.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_temporary_residence = function (req, res) {
    var data = req.body;
    TemporaryResidence.update(data, function (response) {
        res.send({ result: response });
    });
};
