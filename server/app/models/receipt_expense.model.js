const db = require('../common/connect');

const ReceiptExpense = function (receipt_expense) {
    this.id = receipt_expense.id;
    this.reason = receipt_expense.reason;
    this.date = receipt_expense.date;
    this.monney = receipt_expense.monney;
    this.transaction_type = receipt_expense.transaction_type;
    this.person = receipt_expense.person;
};

ReceiptExpense.get_all = function (result) {
    db.query('SELECT * FROM receipt_expense', function (err, receipt_expenses) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

ReceiptExpense.getById = function (id, result) {
    db.query('SELECT * FROM receipt_expense WHERE id=?', id, function (err, receipt_expenses) {
        if (err || receipt_expenses.length === 0) {
            result(null);
        } else {
            result(receipt_expenses[0]);
        }
    });
};

ReceiptExpense.create = function (data, result) {
    db.query('INSERT INTO receipt_expense SET ?', data, function (err, receipt_expense) {
        if (err) {
            result({ error: 'Không thể thêm dữ liệu vào database' });
        } else {
            result({ id: receipt_expense.insertId, ...data });
        }
    });
};

ReceiptExpense.remove = function (id, result) {
    db.query('DELETE FROM receipt_expense WHERE id=?', id, function (err, receipt_expense) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

ReceiptExpense.update = function (receipt_expense, result) {
    db.query(
        'UPDATE receipt_expense SET reason=?, monney=?, date=?, transaction_type=?, person =?WHERE id=?',
        [
            receipt_expense.reason,
            receipt_expense.monney,
            receipt_expense.date,
            receipt_expense.transaction_type,
            receipt_expense.person,
            receipt_expense.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(receipt_expense);
            }
        }
    );
};
ReceiptExpense.get_receipt_by_landlord = function (id, result) {
    db.query(
        'SELECT receipt_expense.*, motel.motel_name as motel_name FROM receipt_expense JOIN motel ON receipt_expense.motel_id = motel.id where motel.landlord_id=?',
        [id],
        function (err, receipt_expense) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(receipt_expense);
            }
        }
    );
};

ReceiptExpense.get_receipt_by_staff = function (id, result) {
    db.query(
        'SELECT receipt_expense.*, motel.motel_name as motel_name FROM receipt_expense JOIN motel ON receipt_expense.motel_id = motel.id where motel.staff_id=?',
        [id],
        function (err, receipt_expense) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(receipt_expense);
            }
        }
    );
};
module.exports = ReceiptExpense;
