const db = require('../common/connect');
const Landlord = function (landlord) {
    this.id = landlord.id;
    this.landlord_name = landlord.landlord_name;
    this.email = landlord.email;
    this.number_phone = landlord.number_phone;
    this.password = landlord.password;
    this.birthday = landlord.birthday;
    this.gender = landlord.gender;
    this.account_type = landlord.account_type;
    this.expiration_date = landlord.expiration_date;
};

Landlord.get_all = function (result) {
    db.query('SELECT * FROM landlord', function (err, landlords) {
        if (err) {
            result(null);
        } else {
            result(landlords);
        }
    });
};

Landlord.getById = function (id, result) {
    db.query('SELECT * FROM landlord WHERE id=?', id, function (err, landlords) {
        if (err || landlords.length === 0) {
            result(null);
        } else {
            result(landlords[0]);
        }
    });
};

Landlord.create = function (data, result) {
    db.query('INSERT INTO landlord SET ?', data, function (err, landlord) {
        if (err) {
            result(null);
        } else {
            result({ id: landlord.insertId, ...data });
        }
    });
};

Landlord.remove = function (id, result) {
    db.query('DELETE FROM landlord WHERE id=?', id, function (err, landlord) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Landlord.update = function (l, result) {
    db.query(
        'UPDATE landlord SET landlord_name=?, email=?, number_phone =?, password=?, birthday=?, gender=?, account_type=?, expiration_date=? WHERE id=?',
        [
            l.landlord_name,
            l.email,
            l.number_phone,
            l.password,
            l.birthday,
            l.gender,
            l.account_type,
            l.expiration_date,
            l.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(l);
            }
        }
    );
};
module.exports = Landlord;
