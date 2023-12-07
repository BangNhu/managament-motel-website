var Problem = require('../models/problem.model');

exports.get_list = function (req, res) {
    Problem.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Problem.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_problem = function (req, res) {
    var data = req.body;

    Problem.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_problem = function (req, res) {
    var id = req.params.id;
    Problem.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_problem = function (req, res) {
    var data = req.body;
    Problem.update(data, function (response) {
        res.send({ result: response });
    });
};
