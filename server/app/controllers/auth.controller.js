var { Landlord, Staff, Tenant } = require('../models/auth.model');
var JWT = require('../common/_JWT');

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
        Landlord.loginAccount({ email, password }, res, function (result) {
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
                    res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
                }
                // if (result.length != 1) {
                //     console.log('hi');
                // }
            }
        });
    }
};
