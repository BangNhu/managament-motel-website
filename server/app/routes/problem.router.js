module.exports = function (router) {
    var problemController = require('../controllers/problem.controller');

    router.get('/problem/list', problemController.get_list);
    router.get('/problem/detail/:id', problemController.details);
    router.post('/problem/add', problemController.add_problem);
    router.delete('/problem/delete/:id', problemController.remove_problem);
    router.put('/problem/update', problemController.update_problem);
};
