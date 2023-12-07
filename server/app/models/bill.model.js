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

module.exports = Bill;
