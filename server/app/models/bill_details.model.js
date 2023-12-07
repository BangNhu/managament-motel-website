const db = require('../common/connect');

const BillDetails = function (bill_details) {
    this.id = bill_details.id;
    this.bill_id = bill_details.bill_id;
    this.total_price_service = bill_details.total_price_service;
    this.electronic_money = bill_details.electronic_money;
    this.water_money = bill_details.water_money;
    this.old_debt = bill_details.old_debt;
    this.costs_incurred = bill_details.costs_incurred;
};

BillDetails.get_all = function (result) {
    db.query('SELECT * FROM bill_details', function (err, bill_details) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

BillDetails.getById = function (id, result) {
    db.query('SELECT * FROM bill_details WHERE id=?', id, function (err, bill_details) {
        if (err || bill_details.length === 0) {
            result(null);
        } else {
            result(bill_details[0]);
        }
    });
};

BillDetails.create = function (data, result) {
    db.query('INSERT INTO bill_details SET ?', data, function (err, bill_details) {
        if (err) {
            result({ error: 'Không thể thêm dữ liệu vào database' });
            console.log(err);
        } else {
            result({ id: bill_details.insertId, ...data });
        }
    });
};

BillDetails.remove = function (id, result) {
    db.query('DELETE FROM bill_details WHERE id=?', id, function (err, bill_details) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

BillDetails.update = function (bill_details, result) {
    db.query(
        'UPDATE bill_details SET bill_id=?, total_price_service=?, electronic_money=?, water_money=?, old_debt=?, costs_incurred=? WHERE id=?',
        [
            bill_details.bill_id,
            bill_details.total_price_service,
            bill_details.electronic_money,
            bill_details.water_money,
            bill_details.old_debt,
            bill_details.costs_incurred,
            bill_details.id,
        ],
        function (err) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(bill_details);
            }
        }
    );
};

module.exports = BillDetails;
