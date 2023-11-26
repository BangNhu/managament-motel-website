var express = require('express');
var app = express();
const _AuthMiddleware = require('./app/common/_AuthMiddleWare');

/*Cấu hình body-parse */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//các
require('./app/routes/home.router')(app);
app.use(_AuthMiddleware.isAuth);
require('./app/routes/landlord.router')(app);

app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});
