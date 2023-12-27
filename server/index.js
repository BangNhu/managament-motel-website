var express = require('express');
var app = express();
const _AuthMiddleware = require('./app/common/_AuthMiddleWare');

// Cross-Origin Resource Sharing: chính sách an ninh được áp dụng trong trình duyệt
const cors = require('cors');
app.use(cors());

/*Cấu hình body-parse */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//các router
require('./app/routes/auth.router')(app);
// require('./app/routes/home.router')(app);
app.use(_AuthMiddleware.isAuth);
require('./app/routes/admin.router')(app);

require('./app/routes/motel.router')(app);
require('./app/routes/block_motel.router')(app);
require('./app/routes/bedsit.router')(app);

require('./app/routes/contract.router')(app);
require('./app/routes/services.router')(app);

require('./app/routes/bill.router')(app);
require('./app/routes/bill_details.router')(app);

require('./app/routes/problem.router')(app);
require('./app/routes/temporary_residence.router')(app);
require('./app/routes/check_out.router')(app);

require('./app/routes/electricity_water.router')(app);
require('./app/routes/receipt_expense.router')(app);

require('./app/routes/landlord.router')(app);
require('./app/routes/staff.router')(app);
require('./app/routes/tenant.router')(app);
require('./app/routes/statistical.router')(app);
app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});
