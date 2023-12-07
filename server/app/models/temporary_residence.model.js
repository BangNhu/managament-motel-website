const db = require('../common/connect');

const TemporaryResidence = function (temporary_residence) {
    this.id = temporary_residence.id;
    this.tenant_id = temporary_residence.tenant_id;
    this.staff_id = temporary_residence.staff_id;
    this.start_day = temporary_residence.start_day;
    this.end_day = temporary_residence.end_day;
    this.status = temporary_residence.status;
};

TemporaryResidence.get_all = function (result) {
    db.query('SELECT * FROM temporary_residence', function (err, temporary_residences) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

TemporaryResidence.getById = function (id, result) {
    db.query(
        'SELECT * FROM temporary_residence WHERE id=?',
        id,
        function (err, temporary_residences) {
            if (err || temporary_residences.length === 0) {
                result(null);
            } else {
                result(temporary_residences[0]);
            }
        }
    );
};

TemporaryResidence.create = function (data, result) {
    db.query('INSERT INTO temporary_residence SET ?', data, function (err, temporary_residence) {
        if (err) {
            result({ error: 'Không thể thêm dữ liệu vào database' });
            console.log(err);
        } else {
            result({ id: temporary_residence.insertId, ...data });
        }
    });
};

TemporaryResidence.remove = function (id, result) {
    db.query('DELETE FROM temporary_residence WHERE id=?', id, function (err, temporary_residence) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

TemporaryResidence.update = function (temporary_residence, result) {
    db.query(
        'UPDATE temporary_residence SET tenant_id=?, start_day=?, staff_id=?, end_day=?, status =? WHERE id=?',
        [
            temporary_residence.tenant_id,
            temporary_residence.start_day,
            temporary_residence.staff_id,
            temporary_residence.end_day,
            temporary_residence.status,
            temporary_residence.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(temporary_residence);
            }
        }
    );
};

module.exports = TemporaryResidence;
