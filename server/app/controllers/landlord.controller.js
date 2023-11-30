var Landlord = require('../models/landlord.model');

//Mã hóa mật khẩu

exports.get_list = function (req, res) {
    Landlord.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Landlord.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_landlord = function (req, res) {
    var data = req.body;

    Landlord.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_landlord = function (req, res) {
    var id = req.params.id;
    Landlord.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_landlord = function (req, res) {
    var data = req.body;
    Landlord.update(data, function (response) {
        res.send({ result: response });
    });
};

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
