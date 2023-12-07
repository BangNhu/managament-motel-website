const db = require('../common/connect');

const ElectricityWater = function (electricity_water) {
    this.id = electricity_water.id;
    this.record_day = electricity_water.record_day;
    this.index_electricity = electricity_water.index_electricity;
    this.index_water = electricity_water.index_water;
    this.price_electricity = electricity_water.price_electricity;
    this.price_water = electricity_water.price_water;
    this.bedsit_id = electricity_water.bedsit_id;
};

ElectricityWater.get_all = function (result) {
    db.query('SELECT * FROM electricity_water', function (err, electricity_waters) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

ElectricityWater.getById = function (id, result) {
    db.query('SELECT * FROM electricity_water WHERE id=?', id, function (err, electricity_waters) {
        if (err || electricity_waters.length === 0) {
            result(null);
        } else {
            result(electricity_waters[0]);
        }
    });
};

ElectricityWater.create = function (data, result) {
    db.query('INSERT INTO electricity_water SET ?', data, function (err, electricity_water) {
        if (err) {
            result({ error: 'Không thể thêm dữ liệu vào database' });
            console.log(err);
        } else {
            result({ id: electricity_water.insertId, ...data });
        }
    });
};

ElectricityWater.remove = function (id, result) {
    db.query('DELETE FROM electricity_water WHERE id=?', id, function (err, electricity_water) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

ElectricityWater.update = function (electricity_water, result) {
    db.query(
        'UPDATE electricity_water SET record_day=?, index_electricity=?, index_water=?, price_electricity =?, price_water=?, bedsit_id=? WHERE id=?',
        [
            electricity_water.record_day,
            electricity_water.index_electricity,
            electricity_water.index_water,
            electricity_water.price_electricity,
            electricity_water.price_water,
            electricity_water.bedsit_id,
            electricity_water.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(electricity_water);
            }
        }
    );
};

module.exports = ElectricityWater;
