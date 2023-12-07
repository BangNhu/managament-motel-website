const jwt = require('jsonwebtoken');
const _APP = require('./_APP');

// make: tạo mã token
let make = function (userID, userType, permissions) {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            { userID, userType, permissions },
            _APP.ACCESS_TOKEN,
            {
                algorithm: 'HS256',
                expiresIn: _APP.TOKEN_TIME_LIFE,
            },
            function (err, _token) {
                if (err) {
                    reject(err);
                } else {
                    resolve(_token);
                }
            }
        );
    });
};
// check: xác thực mã đúng, sai, hết hạn
let check = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, _APP.ACCESS_TOKEN, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
module.exports = { make: make, check: check };
