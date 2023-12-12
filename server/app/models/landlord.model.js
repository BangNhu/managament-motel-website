const db = require('../common/connect');

//Mã hóa mật khẩu
const bcrypt = require('bcrypt');

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
    this.is_verified = landlord.is_verified;
    this.email_token = landlord.email_token;
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
    db.query(
        'SELECT * FROM landlord WHERE email = ? OR number_phone = ?',
        [data.email, data.number_phone],
        function (error, results, fields) {
            if (error) {
                result(error, null);
                console.log('lỗi if đầu', error);
            } else {
                if (results.length > 0) {
                    if (results[0].email === data.email) {
                        result(null, { success: false, message: 'Email đã được đăng ký' });
                    } else if (results[0].number_phone === data.number_phone) {
                        result(null, { success: false, message: 'Số điện thoại đã được đăng ký ' });
                    }
                } else {
                    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
                    bcrypt.hash(data.password, 10, function (err, hashedPassword) {
                        if (err) {
                            result(err, null);
                            console.log('lỗi mã hóa', error);
                        } else {
                            data.password = hashedPassword;
                            db.query(
                                'INSERT INTO landlord SET ?',
                                [data],
                                function (error, landlord, fields) {
                                    if (error) {
                                        result(error, null);
                                        console.log('lỗi insert', error);
                                    } else {
                                        result({ id: landlord.insertId, ...data });
                                    }
                                }
                            );
                        }
                    });
                }
            }
        }
    );
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
