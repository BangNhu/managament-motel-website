var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '',
    user: 'root',
    database: 'management-motel',
    password: '',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});
module.exports = connection;
