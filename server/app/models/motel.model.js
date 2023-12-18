const db = require('../common/connect');

const Motel = function (motel) {
    this.id = motel.id;
    this.motel_name = motel.motel_name;
    this.pay_day = motel.pay_day;
    this.record_day = motel.record_day;
    this.address = motel.address;
    this.staff_id = motel.staff_id;
    this.landlord_id = motel.landlord_id;
};

Motel.get_all = function (result) {
    db.query(
        'SELECT motel.*, staff.staff_name as staff_name FROM motel JOIN staff ON motel.staff_id = staff.id',
        function (err, motels) {
            if (err) {
                result(null);
            } else {
                result(motels);
            }
        }
    );
};

Motel.get_all_by_landlord = function (id, result) {
    db.query(
        'SELECT motel.*, staff.staff_name as staff_name FROM motel JOIN staff ON motel.staff_id = staff.id where motel.landlord_id=?',
        [id],
        function (err, motels) {
            if (err) {
                result('lỗi');
            } else {
                result(motels);
            }
        }
    );
};

Motel.getById = function (id, result) {
    db.query('SELECT * FROM motel WHERE id=?', id, function (err, motels) {
        if (err || motels.length === 0) {
            result(null);
        } else {
            result(motels[0]);
        }
    });
};

Motel.create = function (data, result) {
    //Các khu trọ có cùng chủ trọ thì tên khu trọ phải khác nhau
    db.query(
        'SELECT * FROM motel WHERE landlord_id = ? AND motel_name = ?',
        [data.landlord_id, data.motel_name],
        function (error, results) {
            if (error) {
                console.log(error);
                result({ error: 'Internal Server Error' });
            } else {
                if (results.length > 0) {
                    result({ error: 'Tên khu trọ này đã được sử dụng' });
                } else {
                    db.query('INSERT INTO motel SET ?', data, function (err, motel) {
                        if (err) {
                            result({ error: 'Không thể thêm dữ liệu vào database' });
                        } else {
                            result({ id: motel.insertId, ...data });
                        }
                    });
                }
            }
        }
    );
};

Motel.remove = function (id, result) {
    db.query('DELETE FROM motel WHERE id=?', id, function (err, motel) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Motel.update = function (motel, result) {
    db.query(
        'UPDATE motel SET motel_name=?, record_day=?, pay_day=?, address=?, staff_id =?, landlord_id=? WHERE id=?',
        [
            motel.motel_name,

            motel.record_day,
            motel.pay_day,
            motel.address,
            motel.staff_id,
            motel.landlord_id,
            motel.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(motel);
            }
        }
    );
};

module.exports = Motel;
