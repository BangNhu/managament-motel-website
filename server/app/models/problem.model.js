const db = require('../common/connect');

const Problem = function (problem) {
    this.id = problem.id;
    this.bedsit_id = problem.bedsit_id;
    this.tenant_id = problem.tenant_id;
    this.report_day = problem.report_day;
    this.describe_problem = problem.describe_problem;
    this.status = problem.status;
};

Problem.get_all = function (result) {
    db.query('SELECT * FROM problem', function (err, problems) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

Problem.getById = function (id, result) {
    db.query('SELECT * FROM problem WHERE id=?', id, function (err, problems) {
        if (err || problems.length === 0) {
            result(null);
        } else {
            result(problems[0]);
        }
    });
};

Problem.create = function (data, result) {
    db.query('INSERT INTO problem SET ?', data, function (err, problem) {
        if (err) {
            result({ error: 'Không thể thêm dữ liệu vào database' });
        } else {
            result({ id: problem.insertId, ...data });
        }
    });
};

Problem.remove = function (id, result) {
    db.query('DELETE FROM problem WHERE id=?', id, function (err, problem) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Problem.update = function (problem, result) {
    db.query(
        'UPDATE problem SET bedsit_id=?, tenant_id=?, report_day=?, describe_problem=?, status =? WHERE id=?',
        [
            problem.bedsit_id,
            problem.tenant_id,
            problem.report_day,
            problem.describe_problem,
            problem.status,
            problem.id,
        ],
        function (err) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(problem);
            }
        }
    );
};

module.exports = Problem;
