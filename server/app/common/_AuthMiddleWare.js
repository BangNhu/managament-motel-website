let isAuth = async function (req, res, next) {
    try {
        var _JWT = require('./_JWT');
        const _token = req.headers.authorization.split(' ')[1]; // dùng split bỏ đi phần Bearer header Authorization HTTP

        if (_token) {
            try {
                var authData = await _JWT.check(_token);
                req.auth = authData;
                console.log(req.headers);
                next();
            } catch (err) {
                res.status(401).json({ error: 'Mã token không hợp lệ' });
            }
        } else {
            res.status(401).json({ error: 'Bạn chưa gửi kèm mã token' });
        }
    } catch (err) {
        console.error('Error during require(_JWT):', err.message);
        res.status(500).json({ error: 'Lỗi nội bộ' });
    }
};

module.exports = { isAuth: isAuth };
