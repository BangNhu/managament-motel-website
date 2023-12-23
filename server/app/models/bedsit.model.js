const db = require('../common/connect');

const Bedsit = function (bedsit) {
    this.id = bedsit.id;
    this.bedsit_name = bedsit.bedsit_name;
    this.block_motel_id = bedsit.block_motel_id;
    this.status = bedsit.status;
    this.current_quantity = bedsit.current_quantity;
};
const BedsitService = function (bedsit_server) {
    this.bedsit_id = bedsit_server.bedsit_id;
    this.service_id = bedsit_server.service_id;
};
const BedsitTenant = function (bedsit_server) {
    this.bedsit_id = bedsit_server.bedsit_id;
    this.service_id = bedsit_server.service_id;
};
Bedsit.get_all = function (result) {
    db.query('SELECT * FROM bedsit', function (err, bedsits) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

Bedsit.getById = function (id, result) {
    db.query('SELECT * FROM bedsit WHERE id=?', id, function (err, bedsits) {
        if (err || bedsits.length === 0) {
            result(null);
        } else {
            result(bedsits[0]);
        }
    });
};

Bedsit.create = function (data, result) {
    //Các phòng trọ ở cùng dãy trọ thì tên phòng trọ phải khác nhau
    db.query(
        'SELECT * FROM bedsit WHERE block_motel_id = ? AND bedsit_name = ?',
        [data.block_motel_id, data.bedsit_name],
        function (error, results) {
            if (error) {
                console.log(error);
                result({ error: 'Internal Server Error' });
            } else {
                if (results.length > 0) {
                    result({ error: 'Tên phòng trọ đã được sử dụng cho dãy trọ này' });
                } else {
                    db.query('INSERT INTO bedsit SET ?', data, function (err, bedsit) {
                        if (err) {
                            result({ error: 'Không thể thêm dữ liệu vào database' });
                        } else {
                            result({ id: bedsit.insertId, ...data });
                        }
                    });
                }
            }
        }
    );
};

Bedsit.remove = function (id, result) {
    db.query('DELETE FROM bedsit WHERE id=?', id, function (err, motel) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Bedsit.update = function (bedsit, result) {
    db.query(
        'UPDATE motel SET bedsit_name=?, block_motel_id=?, status =?, current_quantity=? WHERE id=?',
        [
            bedsit.bedsit_name,
            bedsit.block_bedsit_id,
            bedsit.status,
            bedsit.current_quantity,
            bedsit.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(bedsit);
            }
        }
    );
};

Bedsit.get_bedsit_by_landlord = function (id, result) {
    db.query(
        'SELECT bedsit.*, block_motel.block_motel_name as block_motel_name, motel.motel_name as motel_name FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE motel.landlord_id = ?',
        [id],
        function (err, block_motels) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(block_motels);
            }
        }
    );
};

Bedsit.get_bedsit_by_staff = function (id, result) {
    db.query(
        'SELECT bedsit.*, block_motel.block_motel_name as block_motel_name, motel.motel_name as motel_name FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE motel.staff_id = ?',
        [id],
        function (err, block_motels) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(block_motels);
            }
        }
    );
};

BedsitService.add_bedsit_service = function (data, result) {
    db.query('INSERT INTO bedsit_service SET ? ', [data], function (err, bedsit_service) {
        if (err) {
            return result(null);
        } else result(bedsit_service);
    });
};
BedsitTenant.add_bedsit_tenant = function (data, result) {
    db.query('INSERT INTO bedsit_tenant SET ? ', [data], function (err, bedsit_tenant) {
        if (err) {
            return result(null);
        } else result(bedsit_tenant);
    });
};
module.exports = {
    Bedsit,
    BedsitService,
    BedsitTenant,
};
