const { error } = require('console');
const db = require('../common/connect');

const Bill = function (bill) {
    this.id = bill.id;
    this.bedsit_id = bill.bedsit_id;
    this.pay_day = bill.pay_day;
    this.total = bill.total;
    this.status = bill.status;
    this.note = bill.note;
    this.landlord_id = bill.landlord_id;
};

Bill.get_all = function (result) {
    db.query('SELECT * FROM bill', function (err, bill) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};
Bill.get_all_tenant = function (id, result) {
    db.query(
        'SELECT bill.*, bedsit.bedsit_name as bedsit_name FROM bill JOIN bedsit ON bill.bedsit_id = bedsit.id JOIN bedsit_tenant ON bedsit_tenant.bedsit_id = bedsit.id WHERE bedsit_tenant.tenant_id=?',
        id,
        function (err, bills) {
            if (err) {
                console.log(err);
                result(null);
            } else {
                result(bills);
            }
        }
    );
};
Bill.getById = function (id, result) {
    db.query('SELECT * FROM bill WHERE id=?', id, function (err, bills) {
        if (err || bills.length === 0) {
            result(null);
        } else {
            result(bills[0]);
        }
    });
};

Bill.create = function (data, result) {
    db.query('INSERT INTO bill SET ?', data, function (err, bill) {
        if (err) {
            result({ error: 'Không thể thêm dữ liệu vào database' });
            console.log(err);
        } else {
            result({ id: bill.insertId, ...data });
        }
    });
};

Bill.remove = function (id, result) {
    db.query('DELETE FROM bill WHERE id=?', id, function (err, bill) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Bill.update = function (bill, result) {
    db.query(
        'UPDATE bill SET bedsit_id=?, pay_day=?, total=?, status=?, note =? WHERE id=?',
        [bill.bedsit_id, bill.pay_day, bill.total, bill.status, bill.note, bill.id],
        function (err) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(bill);
            }
        }
    );
};
//Lấy ra các trường liên quan đến chi phí để tiến hành lập hóa đơn
Bill.get_expense = function (id, result) {
    db.query('', id, function (err, dataset) {});
};
Bill.get_old_new = function (id, result) {
    db.query(
        'SELECT * FROM electricity_water WHERE bedsit_id=? ORDER BY record_day DESC LIMIT 2',
        [id],
        function (err, dataset) {
            if (err) {
                console.log('lỗi', err);
                return null;
            } else {
                if (dataset && dataset.length > 0) {
                    newRecordDay = dataset[0];
                    lastRecordDay = dataset[1];
                    index_electric_new = dataset[0].index_electricity;
                    index_water_new = dataset[0].index_water;
                    index_electric_old = dataset[1].index_electricity;
                    index_water_old = dataset[1].index_water;
                    amount_electric = index_electric_new - index_electric_old;
                    amount_water = index_water_new - index_water_old;
                    result({
                        index_electric_new: index_electric_new,
                        index_water_new: index_water_new,
                        index_electric_old: index_electric_old,
                        index_water_old: index_water_old,
                        amount_electric: amount_electric,
                        amount_water: amount_water,
                    });
                }
            }
        }
    );
};
Bill.get_price_bedsit = function (id, result) {
    db.query(
        'SELECT bedsit.*, block_motel.block_motel_name as block_motel_name, motel.motel_name as motel_name, block_motel.price AS price, motel.price_electricity AS price_electricity, motel.price_water AS price_water FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bedsit.id = ?',
        id,
        function (err, bills) {
            if (err) {
                result(null);
            } else {
                result(bills);
            }
        }
    );
};
Bill.get_services_bedsit = function (id, result) {
    db.query(
        'SELECT services.* FROM services JOIN bedsit_service ON services.id = bedsit_service.service_id WHERE bedsit_service.bedsit_id = ?',
        id,
        function (err, bills) {
            if (err) {
                console.log('error', err);
                result(null);
            } else {
                result(bills);
            }
        }
    );
};
module.exports = Bill;
