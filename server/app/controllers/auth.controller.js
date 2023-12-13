var { Landlord, Staff, Tenant, Admin } = require('../models/auth.model');
var JWT = require('../common/_JWT');
const crypto = require('crypto');

exports.signup = function (req, res) {
    let { landlord_name, email, number_phone, password, birthday, gender } = req.body;
    landlord_name = landlord_name.trim();
    email = email.trim();
    number_phone = number_phone.trim();
    password = password.trim();
    birthday = birthday.trim();
    gender = gender.trim();
    if (
        landlord_name == '' ||
        email == '' ||
        number_phone == '' ||
        password == '' ||
        birthday == '' ||
        gender == ''
    ) {
        res.json({
            status: 'False',
            message: 'Vui lòng nhập đầy đủ thông tin',
        });
    }
    // //Nhập chữ cái có dấu
    // else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ]*$/.test(landlord_name)) {
    //     res.json({
    //         status: 'False',
    //         message: 'Vui lòng nhập chữ cái',
    //     });
    // }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.json({
            status: 'False',
            message: 'Vui lòng nhập đúng email',
        });
    } else if (!/^0[0-9]{9}$/.test(number_phone)) {
        res.json({
            status: 'False',
            message: 'Vui lòng nhập đúng số điện thoại',
        });
    } else if (password.length > 8) {
        res.json({
            status: 'False',
            message: 'Vui lòng nhập đúng mật khẩu từ 8 ký tự trở lên',
        });
    } else if (!new Date(birthday).getTime()) {
        res.json({
            status: 'False',
            message: 'Vui lòng nhập đúng ngày sinh',
        });
    } else {
        Landlord.signUp(
            {
                landlord_name,
                email,
                number_phone,
                password,
                birthday,
                gender,
                email_token: '',
            },
            function (result) {
                {
                    res.json(result);
                }
            }
        );
    }
};

exports.forgot_password = function (req, res) {
    let { email } = req.body;
    Landlord.forget({ email, reset_password: '' }, function (result) {
        if (result) {
            res.send({ result });
        } else {
            res.status(404).json('Gửi quên mật khẩu thất bại');
        }
    });
};
exports.reset_password = function (req, res) {
    let data = req.body;
    Landlord.reset(data, function (result) {
        if (result) {
            res.send({ result });
        } else {
            res.status(404).json('Đổi mật khẩu thất bại');
        }
    });
};
exports.login = function (req, res) {
    let { account_name, password } = req.body;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account_name);
    const isNumberPhone = /^0[0-9]{9}$/.test(account_name);
    // Input validation
    if (!password) {
        return res.json({
            status: 'False',
            message: 'Vui lòng nhập mật khẩu',
        });
    }

    if (isEmail) {
        // Landlord login using email and password
        Landlord.loginAccount({ account_name, password }, function (landlordResult) {
            if (landlordResult) {
                handleLoginSuccess(res, landlordResult.id, 'landlord');
            } else {
                handleLoginFailure(res);
            }
        });
    } else if (isNumberPhone) {
        Staff.loginAccount({ account_name, password }, function (staffResult) {
            if (staffResult) {
                handleLoginSuccess(res, staffResult.id, 'staff', staffResult.permissions);
            } else {
                Tenant.loginAccount({ account_name, password }, function (tenantResult) {
                    if (tenantResult) {
                        handleLoginSuccess(res, tenantResult.id, 'tenant');
                    } else {
                        handleLoginFailure(res);
                    }
                });
            }
        });
    } else {
        return res.json({
            status: 'False',
            message: 'Vui lòng nhập thông tin đăng nhập',
        });
    }
};

function handleLoginSuccess(res, identifier, userType, permissions) {
    JWT.make(identifier, userType, permissions)
        .then((token) => {
            res.json({ token });
        })
        .catch((error) => {
            console.error(error);
            res.send('that bai');
        });
}

function handleLoginFailure(res) {
    res.status(401).json({
        message: 'Thông tin đăng nhập chưa chính xác',
    });
}

function isValidPhoneNumber(number) {
    return /^\d{10}$/.test(number);
}

exports.admin_login = function (req, res) {
    let data = req.body;
    Staff.loginAccount({ data }, function (result) {
        {
            if (result.length > 0) {
                // Gọi hàm make để tạo JWT token
                JWT.make(data.user_name, 'admin')
                    .then((token) => {
                        res.json({ token });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.send('that bai');
                    });
            } else {
                res.status(401).json({
                    message: 'Email hoặc mật khẩu không đúng',
                });
            }
        }
    });
};

exports.check_token = async function (req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1]; // dùng split bỏ đi phần Bearer header Authorization HTTP
        const data = await JWT.check(token);
        res.send({ data: data });
    } catch (err) {
        res.status(401).send({ error: 'Data không hợp lệ' });
    }
};

exports.verify_email = async function (req, res) {
    var data = req.query;
    Landlord.verify(data, function (result) {
        if (result) {
            // handleLoginSuccess(res, result.id);
            res.send({ result });
        } else {
            res.status(404).json('Xác nhận thất bại');
        }
    });
};
