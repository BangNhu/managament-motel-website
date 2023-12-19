const db = require('../common/connect');

//Mã hóa mật khẩu
const bcrypt = require('bcrypt');

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

const PermissionStaff = function (permission_staff) {
    this.permission_id = permission_staff.permission_id;
    this.staff_id = permission_staff.staff_id;
};

Staff.get_all = function (result) {
    db.query('SELECT * FROM staff', function (err, staffs) {
        if (err) {
            result(null);
        } else {
            result(staffs);
        }
    });
};

Staff.getById = function (id, result) {
    db.query('SELECT * FROM staff WHERE id=?', id, function (err, staffs) {
        if (err || staffs.length === 0) {
            result(null);
        } else {
            result(staffs[0]);
        }
    });
};
Staff.getStaffsByLandlordId = function (id, result) {
    db.query('SELECT * FROM staff WHERE landlord_id=?', id, function (err, staffs) {
        if (err) {
            result(null);
        } else {
            result(staffs);
        }
    });
};
function insertMultiplePermissionStaff(permissionStaffData, callback) {
    db.query(
        'INSERT INTO permission_staff (staff_id, permission_id) VALUES ?',
        [permissionStaffData.map((item) => [item.staff_id, item.permission_id])],
        function (error, result, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        }
    );
}

Staff.create = function (data, result) {
    db.query(
        'SELECT * FROM staff WHERE email = ? OR number_phone = ?',
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
                                'INSERT INTO staff SET ?',
                                [data],
                                function (error, staff, fields) {
                                    if (error) {
                                        result(error, null);
                                        console.log('lỗi insert', error);
                                    } else {
                                        // result({ id: staff.insertId, ...data });

                                        const permissions = [
                                            7, 8, 10, 11, 13, 14, 16, 18, 19, 20, 21, 28, 29, 30,
                                            31,
                                        ];
                                        const permissionStaffData = permissions.map(
                                            (permission_id) => ({
                                                staff_id: staff.insertId,
                                                permission_id: permission_id,
                                            })
                                        );

                                        insertMultiplePermissionStaff(
                                            permissionStaffData,
                                            function (error, permissionStaffResult) {
                                                if (error) {
                                                    // Handle the error
                                                    console.log(
                                                        'lỗi insert PermissionStaff',
                                                        error
                                                    );
                                                } else {
                                                    // Return the result
                                                    result({ id: staff.insertId, ...data });
                                                }
                                            }
                                        );
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

Staff.remove = function (id, result) {
    db.query('DELETE FROM staff WHERE id=?', id, function (err, staff) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Staff.update = function (staff, result) {
    db.query(
        'UPDATE staff SET staff_name=?, citizen_identification=?, address =?, number_phone=?, email=?, landlord_id=?, password=?, gender=?, birthday=? WHERE id=?',
        [
            staff.staff_name,
            staff.citizen_identification,
            staff.address,
            staff.number_phone,
            staff.email,
            staff.landlord_id,
            staff.password,
            staff.gender,
            staff.birthday,
            staff.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(staff);
            }
        }
    );
};

//Phân quyền
Staff.get_permission = function (id, result) {
    db.query(
        'SELECT permission_id from permission_staff where staff_id=?',
        id,
        function (err, staffs) {
            if (err) {
                result(null);
                console.log(err);
            } else {
                result(staffs);
            }
        }
    );
};

Staff.add_staff_permission = function (data, result) {
    db.query(
        'INSERT INTO permission_staff set permission_id=?, staff_id=?',
        [data.permission_id, data.staff_id],
        function (err) {
            if (err) {
                result({ error: 'Không thể thêm dữ liệu vào database' });
                console.log(err);
            } else {
                result([data.permission_id, data.staff_id]);
            }
        }
    );
};

Staff.remove_staff_permission = function (data, result) {
    db.query(
        'DELETE FROM permission_staff WHERE permission_id=? AND staff_id=?',
        [data.permission_id, data.staff_id],
        function (err, motel) {
            if (err) {
                console.log(err);
                result(null);
            } else {
                result('Xóa dữ liệu có id' + data.staff_id + 'thành công');
            }
        }
    );
};

module.exports = Staff;
