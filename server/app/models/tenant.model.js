const db = require('../common/connect');

//Mã hóa mật khẩu
const bcrypt = require('bcrypt');

const Tenant = function (tenant) {
    this.id = tenant.id;
    this.tenant_name = tenant.tenant_name;
    this.birthday = tenant.birthday;
    this.citizen_identification = tenant.citizen_identification;
    this.number_phone = tenant.number_phone;
    this.email = tenant.email;
    this.password = tenant.password;
    this.gender = tenant.gender;
};

Tenant.get_all = function (result) {
    db.query('SELECT * FROM tenant', function (err, tenants) {
        if (err) {
            result(null);
        } else {
            result(tenants);
        }
    });
};

Tenant.getById = function (id, result) {
    db.query('SELECT * FROM tenant WHERE id=?', id, function (err, tenants) {
        if (err || tenants.length === 0) {
            result(null);
        } else {
            result(tenants[0]);
        }
    });
};

Tenant.create = function (data, result) {
    db.query('SELECT * FROM tenant', function (error, results, fields) {
        if (error) {
            result(error, null);
            console.log('lỗi if đầu', error);
        } else {
            if (results.length > 0) {
                if (results[0].email === data.email) {
                    result(null, { success: false, message: 'Email đã được đăng ký' });
                } else if (results[0].number_phone === data.number_phone) {
                    result(null, { success: false, message: 'Số điện thoại đã được đăng ký ' });
                } else if (results[0].citizen_identification === data.citizen_identification) {
                    result(null, { success: false, message: 'Số định danh đã được đăng ký ' });
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
                            'INSERT INTO tenant SET ?',
                            [data],
                            function (error, tenant, fields) {
                                if (error) {
                                    result(error, null);
                                    console.log('lỗi insert', error);
                                } else {
                                    result({ id: tenant.insertId, ...data });
                                }
                            }
                        );
                    }
                });
            }
        }
    });
    // db.query('INSERT INTO tenant SET ?', data, function (err, tenant) {
    //     if (err) {
    //         result(null);
    //     } else {
    //         result({ id: tenant.insertId, ...data });
    //     }
    // });
};

Tenant.remove = function (id, result) {
    db.query('DELETE FROM tenant WHERE id=?', id, function (err, tenant) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Tenant.update = function (tenant, result) {
    db.query(
        'UPDATE tenant SET tenant_name=?, birthday=?, citizen_identification =?, phone_number=?, email=?, password=?, gender=?  WHERE id=?',
        [
            tenant.tenant_name,
            tenant.birthday,
            tenant.citizen_identification,
            tenant.phone_number,
            tenant.email,
            tenant.password,
            tenant.gender,
            tenant.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(tenant);
            }
        }
    );
};
Tenant.get_tenant_by_landlord = function (id, result) {
    db.query(
        'SELECT tenant.*, motel.motel_name as motel_name FROM tenant JOIN motel ON tenant.motel_id = motel.id where motel.landlord_id=?',
        [id],
        function (err, tenant) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(tenant);
            }
        }
    );
};

Tenant.get_tenant_by_staff = function (id, result) {
    db.query(
        'SELECT tenant.*, motel.motel_name as motel_name FROM tenant JOIN motel ON tenant.motel_id = motel.id where motel.staff_id=?',
        [id],
        function (err, tenant) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(tenant);
            }
        }
    );
};
module.exports = Tenant;
