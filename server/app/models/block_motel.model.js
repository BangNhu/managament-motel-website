const db = require('../common/connect');

const BlockMotel = function (motel) {
    this.id = motel.id;
    this.block_motel_name = motel.block_motel_name;
    this.motel_id = motel.motel_id;
    this.max_quantity = motel.staff_id;
    this.price = motel.price;
};

BlockMotel.get_all = function (result) {
    db.query('SELECT * FROM block_motel', function (err, block_motels) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

BlockMotel.getById = function (id, result) {
    db.query('SELECT * FROM block_motel WHERE id=?', id, function (err, block_motels) {
        if (err || block_motels.length === 0) {
            result(null);
        } else {
            result(block_motels[0]);
        }
    });
};

BlockMotel.create = function (data, result) {
    //Các khu trọ có cùng chủ trọ thì tên khu trọ phải khác nhau
    db.query(
        'SELECT * FROM block_motel WHERE block_motel_name=? AND motel_id=?',
        [data.block_motel_name, data.motel_id],
        function (error, results) {
            if (error) {
                console.log(error);
                result({ error: 'Internal Server Error' });
            } else {
                if (results.length > 0) {
                    result({ error: 'Tên dãy trọ này đã được sử dụng' });
                } else {
                    db.query('INSERT INTO block_motel SET ?', data, function (err, block_motel) {
                        if (err) {
                            result({ error: 'Không thể thêm dữ liệu vào database' });
                        } else {
                            result({ id: block_motel.insertId, ...data });
                        }
                    });
                }
            }
        }
    );
};

BlockMotel.remove = function (id, result) {
    db.query('DELETE FROM block_motel WHERE id=?', id, function (err, block_motel) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

BlockMotel.update = function (block_motel, result) {
    db.query(
        'UPDATE block_motel SET block_motel_name=?, motel_id=?, max_quantity =?, price=? WHERE id=?',
        [
            block_motel.block_motel_name,
            block_motel.motel_id,
            block_motel.max_quantity,
            block_motel.price,
            block_motel.id,
        ],
        function (err) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(block_motel);
            }
        }
    );
};

module.exports = BlockMotel;
