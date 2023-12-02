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
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (email == '' || password == '') {
        res.json({
            status: 'False',
            message: 'Vui lòng nhập đầy đủ thông tin',
        });
    } else {
        Landlord.loginAccount({ email, password }, function (result) {
            {
                // res.json(result);
                // console.log(result.length);
                if (result.length > 0) {
                    // Gọi hàm make để tạo JWT token
                    JWT.make(email, 'landlord')
                        .then((token) => {
                            res.json({ token });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.send('that bai');
                        });
                } else {
                    // res.status(401).json({
                    //     message: 'Email hoặc mật khẩu không đúng',
                    // });
                    Staff.loginAccount({ email, password }, function (result) {
                        {
                            if (result.length > 0) {
                                // Gọi hàm make để tạo JWT token
                                JWT.make(email, 'staff')
                                    .then((token) => {
                                        res.json({ token });
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                        res.send('that bai');
                                    });
                            } else {
                                Tenant.loginAccount({ email, password }, function (result) {
                                    {
                                        if (result.length > 0) {
                                            // Gọi hàm make để tạo JWT token
                                            JWT.make(email, 'tenant')
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
                            }
                        }
                    });
                }
            }
        });
    }
};

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
