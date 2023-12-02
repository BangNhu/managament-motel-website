const db = require('../common/connect');

//Mã hóa mật khẩu
const bcrypt = require('bcrypt');

const Admin = function (admin) {
    this.id = admin.id;
    this.user_name = admin.user_name;
    this.password = admin.password;
};

Admin.get_all = function (result) {
    db.query('SELECT * FROM admin', function (err, admins) {
        if (err) {
            result(null);
        } else {
            result(admins);
        }
    });
};

Admin.getById = function (id, result) {
    db.query('SELECT * FROM admin WHERE id=?', id, function (err, admins) {
        if (err || admins.length === 0) {
            result(null);
        } else {
            result(admins[0]);
        }
    });
};

Admin.create = function (data, result) {
    db.query(
        'SELECT * FROM admin WHERE user_name = ?',
        [data.email],
        function (error, results, fields) {
            if (error) {
                result(error, null);
                console.log('lỗi if đầu', error);
            } else {
                if (results.length > 0) {
                    if (results[0].user_name === data.user_name) {
                        result(null, { success: false, message: 'Tên người dùng đã được sử dụng' });
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
                                'INSERT INTO admin SET ?',
                                [data],
                                function (error, admin, fields) {
                                    if (error) {
                                        result(error, null);
                                        console.log('lỗi insert', error);
                                    } else {
                                        result({ id: admin.insertId, ...data });
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

Admin.remove = function (id, result) {
    db.query('DELETE FROM admin WHERE id=?', id, function (err, admin) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};
Admin.update = function (admin, result) {
    bcrypt.hash(admin.password, 10, function (err, hashedPassword) {
        if (err) {
            result(err, null);
            console.log('lỗi mã hóa', error);
        } else {
            admin.password = hashedPassword;
            db.query(
                'UPDATE admin SET user_name=?,  password=? WHERE id=?',
                [admin.user_name, admin.password, admin.id],
                function (err) {
                    if (err) {
                        result(null);
                    } else {
                        result(admin);
                    }
                }
            );
        }
    });
};

module.exports = Admin;
