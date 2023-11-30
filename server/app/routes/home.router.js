module.exports = function (router) {
    // landlordController = require('../models/landlord.model');
    // var JWT = require('../common/_JWT');
    // router.get('/token', async function (req, res) {
    //     var user = {
    //         name: 'Admin',
    //         email: 'admin@gmail.com',
    //     };
    //     const _token = await JWT.make(user);
    //     res.send({ token: _token });
    // });
    // router.get('/check_token', async function (req, res) {
    //     try {
    //         var _token =
    //             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTcwMDkyMzk3OSwiZXhwIjoxNzAwOTI3NTc5fQ.e_XPOuk6y9kYzIXqF5jGtHsPmnggd1uUXoWNoG-8fOw';
    //         const data = await JWT.check(_token);
    //         res.send({ data: data });
    //     } catch (err) {
    //         res.send({ data: 'Data không hợp lệ' });
    //     }
    // });
};
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // Query cơ sở dữ liệu để kiểm tra đăng nhập
//     db.query(
//         `SELECT * FROM landlords WHERE email = ? AND password = ?`,
//         [email, password],
//         (err, results) => {
//             if (err) throw err;

//             if (results.length > 0) {
//                 // Tạo token và gửi về client
//                 const token = jwt.sign({ email, userType: 'landlord' }, secretKey);
//                 res.json({ token });
//             } else {
//                 // Nếu không tìm thấy trong landlords, kiểm tra staffs
//                 db.query(
//                     `SELECT * FROM staffs WHERE email = ? AND password = ?`,
//                     [email, password],
//                     (err, results) => {
//                         if (err) throw err;

//                         if (results.length > 0) {
//                             // Tạo token và gửi về client
//                             const token = jwt.sign({ email, userType: 'staff' }, secretKey);
//                             res.json({ token });
//                         } else {
//                             // Nếu không tìm thấy trong staffs, kiểm tra tenants
//                             db.query(
//                                 `SELECT * FROM tenants WHERE email = ? AND password = ?`,
//                                 [email, password],
//                                 (err, results) => {
//                                     if (err) throw err;

//                                     if (results.length > 0) {
//                                         // Tạo token và gửi về client
//                                         const token = jwt.sign(
//                                             { email, userType: 'tenant' },
//                                             secretKey
//                                         );
//                                         res.json({ token });
//                                     } else {
//                                         res.sendStatus(401); // Unauthorized
//                                     }
//                                 }
//                             );
//                         }
//                     }
//                 );
//             }
//         }
//     );
// });
