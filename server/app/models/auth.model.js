const db = require('../common/connect');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const sendVerificationMail = require('../utils/sendVerificationMail');
const sendResetPassword = require('../utils/sendResetPassword');

function generateToken(data) {
    const expirationTime = Date.now() + 15 * 60 * 1000; // 15 phút
    const tokenData = `${data}.${expirationTime}`;
    const token = crypto.createHash('sha256').update(tokenData).digest('hex');
    return { token };
}

BCRYPT_SALT_ROUND = process.env.BCRYPT_SALT_ROUND;
const PermissionStaff = function (permission_staff) {
    this.permission_id = permission_staff.permission_id;
    this.staff_id = permission_staff.staff_id;
};

const Admin = function (admin) {
    this.id = admin.id;
    this.user_name = admin.user_name;
    this.password = admin.password;
};

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
    this.reset_token = landlord.reset_token;
};

const Staff = function (staff) {
    this.id = staff.id;
    this.staff_name = staff.staff_name;
    this.citizen_identification = staff.citizen_identification;
    this.address = staff.address;
    this.number_phone = number_phone;
    this.email = staff.email;
    this.landlord_id = staff.landlord_id;
    this.password = staff.password;
    this.gender = staff.gender;
    this.birthday = staff.birthday;
};

const Tenant = function (tenant) {
    this.id = tenant.id;
    this.tenant_name = tenant.tenant_name;
    this.birthday = tenant.birthday;
    this.citizen_identification = citizen_identification;
    this.number_phone = tenant.number_phone;
    this.email = tenant.email;
    this.password = password;
    this.gender = tenant.gender;
};

Landlord.signUp = function (data, result) {
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
                            console.log('lỗi mã hóa', err);
                        } else {
                            data.password = hashedPassword;
                            token = generateToken(data.reset_token);
                            data.email_token = token.token;
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
                            sendVerificationMail(data);
                        }
                    });
                }
            }
        }
    );
};

Landlord.forget = function (data, result) {
    db.query('SELECT * FROM landlord WHERE email=?', [data.email], function (err, landlord) {
        if (err) {
            result(null);
            console.log('không có');
        } else {
            if (landlord.length > 0) {
                const user = landlord[0];
                token = generateToken(data.reset_token);
                console.log(token.token);
                db.query(
                    'UPDATE landlord SET reset_token=? WHERE id=?',
                    [(user.reset_token = token.token), user.id],

                    function (err) {
                        if (err) {
                            result(0);
                            console.log(err);
                        } else {
                            result(user);
                            sendResetPassword(user);
                        }
                    }
                );
            } else {
                result(null);
                console.log('sai');
            }
        }
    });
};

Landlord.reset = function ({ reset_token, data }, result) {
    if (!reset_token) console.log('Email token không tồn tại', reset_token);
    db.query('SELECT * FROM landlord WHERE reset_token=?', [reset_token], function (err, landlord) {
        if (err) {
            throw err;
        } else {
            console.log('landlord', landlord);
            if (landlord.length > 0) {
                const user = landlord[0];
                bcrypt.hash(data.password, 10, function (err, hashedPassword) {
                    if (err) {
                        result(err, null);
                        console.log('lỗi mã hóa', err);
                    } else {
                        data.password = hashedPassword;
                        db.query(
                            'UPDATE landlord SET reset_token=?, password=? WHERE id=?',
                            [(reset_token = null), data.password, user.id],
                            function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    result(user);
                                }
                            }
                        );
                    }
                });
            } else {
                result(null);
            }
        }
    });
};

//Admin login
Admin.loginAccount = function (data, result) {
    db.query(`SELECT * FROM admin WHERE user_name = ?`, [data.user_name], (err, admin) => {
        if (err) throw err;

        if (admin.length > 0) {
            const user = admin[0];

            bcrypt.compare(data.password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) throw bcryptErr;
                if (bcryptResult) {
                    result(admin);
                } else {
                    result(0);
                }
            });
        } else {
            result(0);
        }
    });
};

//Account customer login
Landlord.loginAccount = function (data, result) {
    db.query(`SELECT * FROM landlord WHERE email = ?`, [data.account_name], (err, landlords) => {
        if (err) throw err;

        if (landlords.length > 0) {
            const user = landlords[0];

            bcrypt.compare(data.password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) throw bcryptErr;
                if (bcryptResult) {
                    result(user);
                } else {
                    result(0);
                }
            });
        } else {
            result(0);
        }
    });
};

Staff.loginAccount = function (data, result) {
    db.query(`SELECT * FROM staff WHERE number_phone = ?`, [data.account_name], (err, staffs) => {
        if (err) result(0);

        if (staffs.length > 0) {
            const user = staffs[0];

            bcrypt.compare(data.password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) throw bcryptErr;
                if (bcryptResult) {
                    const staff_id = user.id;
                    db.query(
                        'SELECT permission_id FROM permission_staff WHERE staff_id = ?',
                        [staff_id],
                        (permissionsErr, permissions) => {
                            if (permissionsErr) {
                                result(0);
                            }
                            const permissionIds = permissions.map(
                                (permission) => permission.permission_id
                            );
                            const userDataWithPermissions = {
                                ...user,
                                permissions: permissionIds,
                            };
                            result(userDataWithPermissions);
                            // console.log('hi', userDataWithPermissions);
                        }
                    );
                    // result(staffs);
                } else {
                    result(0);
                }
            });
        } else {
            result(0);
        }
    });
};

Tenant.loginAccount = function (data, result) {
    db.query(`SELECT * FROM tenant WHERE number_phone = ?`, [data.account_name], (err, tenants) => {
        if (err) throw err;

        if (tenants.length > 0) {
            const user = tenants[0];

            bcrypt.compare(data.password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) throw bcryptErr;
                if (bcryptResult) {
                    result(user);
                } else {
                    result(0);
                }
            });
        } else {
            result(0);
        }
    });
};

Landlord.verify = function (data, result) {
    if (!data.email_token) console.log('Email token không tồn tại', data.email_token);
    db.query(
        'SELECT * FROM landlord WHERE email_token=?',
        [data.email_token],
        function (err, landlord) {
            if (err) {
                throw err;
            } else {
                if (landlord.length > 0) {
                    const user = landlord[0];
                    db.query(
                        'UPDATE landlord SET email_token=?, is_verified=? WHERE id=?',
                        [(user.email_token = null), (user.is_verified = 1), user.id],
                        function (err) {
                            if (err) {
                                result(0);
                                console.log(err);
                            } else {
                                result(user);
                            }
                        }
                    );
                    console.log('user', user);
                }
            }
        }
    );
};
module.exports = {
    Landlord,
    Staff,
    Tenant,
    Admin,
};
