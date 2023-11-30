const db = require('../common/connect');
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
    this.phone_number = tenant.phone_number;
    this.email = tenant.email;
    this.password = password;
    this.gender = tenant.gender;
};

Landlord.loginAccount = function (data, res, result) {
    db.query(`SELECT * FROM landlord WHERE email = ?`, [data.email], (err, landlords) => {
        if (err) throw err;

        if (landlords.length > 0) {
            const user = landlords[0];

            bcrypt.compare(data.password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) throw bcryptErr;
                if (bcryptResult) {
                    result(landlords);
                } else {
                    result(0);
                }
                // else {
                //     res.status(401).json({ message: 'Mật khẩu không đúng' });
                //     console.log(
                //         'Mật khẩu nhập: ' + data.password + ', Mật khẩu database: ' + user.password
                //     );
                //     console.log(bcryptResult);
                // }
            });
        }
        //  else {
        //     res.status(401).json({ message: 'Email không tồn tại' });
        // }
    });
};

Staff.loginAccount = function (data, res, result) {
    db.query(`SELECT * FROM staff WHERE email = ?`, [data.email], (err, staffs) => {
        if (err) throw err;

        if (staffs.length > 0) {
            const user = staffs[0];

            bcrypt.compare(data.password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) throw bcryptErr;
                if (bcryptResult) {
                    result(staffs);
                } else {
                    res.status(401).json({ message: 'Mật khẩu không đúng' });
                    console.log(
                        'Mật khẩu nhập: ' + data.password + ', Mật khẩu database: ' + user.password
                    );
                    console.log(bcryptResult);
                }
            });
        } else {
            res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
    });
};

Tenant.loginAccount = function (data, res, result) {
    db.query(`SELECT * FROM tenant WHERE email = ?`, [data.email], (err, tenants) => {
        if (err) throw err;

        if (tenants.length > 0) {
            const user = tenants[0];

            bcrypt.compare(data.password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) throw bcryptErr;
                if (bcryptResult) {
                    result(tenants);
                } else {
                    res.status(401).json({ message: 'Mật khẩu không đúng' });
                    console.log(
                        'Mật khẩu nhập: ' + data.password + ', Mật khẩu database: ' + user.password
                    );
                    console.log(bcryptResult);
                }
            });
        }
        //  else {
        //     res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        // }
    });
};

module.exports = {
    Landlord,
    Staff,
    Tenant,
};
