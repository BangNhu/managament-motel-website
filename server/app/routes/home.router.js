module.exports = function (router) {
    var JWT = require('../common/_JWT');
    router.get('/token', async function (req, res) {
        var user = {
            name: 'Admin',
            email: 'admin@gmail.com',
        };
        const _token = await JWT.make(user);
        res.send({ token: _token });
    });

    router.get('/check_token', async function (req, res) {
        try {
            var _token =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTcwMDkyMzk3OSwiZXhwIjoxNzAwOTI3NTc5fQ.e_XPOuk6y9kYzIXqF5jGtHsPmnggd1uUXoWNoG-8fOw';
            const data = await JWT.check(_token);
            res.send({ data: data });
        } catch (err) {
            res.send({ data: 'Data không hợp lệ' });
        }
    });
};
