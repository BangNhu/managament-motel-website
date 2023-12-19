var BlockMotel = require('../models/block_motel.model');

exports.get_list = function (req, res) {
    BlockMotel.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    BlockMotel.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};
exports.list_by_landlord = function (req, res) {
    BlockMotel.get_bm_by_landlord(req.params.id, function (response) {
        res.send({ result: response });
    });
};
exports.list_by_staff = function (req, res) {
    BlockMotel.get_bm_by_staff(req.params.id, function (response) {
        res.send({ result: response });
    });
};
//body-parser
exports.add_block_motel = function (req, res) {
    var data = req.body;

    BlockMotel.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_block_motel = function (req, res) {
    var id = req.params.id;
    BlockMotel.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_block_motel = function (req, res) {
    var data = req.body;
    BlockMotel.update(data, function (response) {
        res.send({ result: response });
    });
};
