const db = require('../common/connect');

const CheckOut = function (check_out) {
    this.id = check_out.id;
    this.bedsit_id = check_out.bedsit_id;
    this.tenant_id = check_out.tenant_id;
    this.check_out_day = check_out.check_out_day;
    this.reason = check_out.reason;
    this.staff_id = check_out.staff_id;
    this.status = check_out.status;
};

CheckOut.get_all = function (result) {
    db.query('SELECT * FROM check_out', function (err, check_outs) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

CheckOut.getById = function (id, result) {
    db.query('SELECT * FROM check_out WHERE id=?', id, function (err, check_outs) {
        if (err || check_outs.length === 0) {
            result(null);
        } else {
            result(check_outs[0]);
        }
    });
};

CheckOut.create = function (data, result) {
    db.query('INSERT INTO check_out SET ?', data, function (err, check_out) {
        if (err) {
            result({ error: 'Không thể thêm dữ liệu vào database' });
            console.log(err);
        } else {
            result({ id: check_out.insertId, ...data });
        }
    });
};

CheckOut.remove = function (id, result) {
    db.query('DELETE FROM check_out WHERE id=?', id, function (err, check_out) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

CheckOut.update = function (check_out, result) {
    db.query(
        'UPDATE check_out SET bedsit_id=?, check_out_day=?, tenant_id=?, reason =?, staff_id =?, status=? WHERE id=?',
        [
            check_out.bedsit_id,

            check_out.check_out_day,
            check_out.tenant_id,
            check_out.reason,
            check_out.staff_id,
            check_out.status,
            check_out.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(check_out);
            }
        }
    );
};

module.exports = CheckOut;
