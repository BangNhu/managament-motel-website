var { Landlord, Staff, Tenant, Admin } = require('../models/auth.model');
var JWT = require('../common/_JWT');

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
            { landlord_name, email, number_phone, password, birthday, gender },
            function (result) {
                {
                    res.json(result);
                }
            }
        );
    }
};

exports.login = function (req, res) {
    let { email, password, number_phone } = req.body;

    // Input validation
    if (!password) {
        return res.json({
            status: 'False',
            message: 'Vui lòng nhập mật khẩu',
        });
    }

    if (email) {
        // Landlord login using email and password
        Landlord.loginAccount({ email, password }, function (landlordResult) {
            if (landlordResult.length > 0) {
                handleLoginSuccess(res, email, 'landlord');
            } else {
                handleLoginFailure(res);
            }
        });
    } else if (number_phone) {
        // Tenant or Staff login using number_phone and password
        if (!isValidPhoneNumber(number_phone)) {
            return res.json({
                status: 'False',
                message: 'Số điện thoại không hợp lệ',
            });
        }

        Staff.loginAccount({ number_phone, password }, function (staffResult) {
            if (staffResult) {
                handleLoginSuccess(res, number_phone, 'staff', staffResult.permissions);
            } else {
                Tenant.loginAccount({ number_phone, password }, function (tenantResult) {
                    if (tenantResult.length > 0) {
                        handleLoginSuccess(res, number_phone, 'tenant');
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
