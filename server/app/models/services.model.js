const db = require('../common/connect');

const Services = function (services) {
    this.id = services.id;
    this.service_name = services.service_name;
    this.price = services.price;
    this.unit = services.unit;
    this.is_required = services.is_required;
    this.motel_id = services.motel_id;
};

const Bedsit_Service = function (bedsit_service) {
    this.bedsit_id = bedsit_service.bedsit_id;
    this.service_id = bedsit_service.service_id;
};

Services.get_all = function (result) {
    db.query('SELECT * FROM services', function (err, services) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

Services.getById = function (id, result) {
    db.query('SELECT * FROM services WHERE id=?', id, function (err, services) {
        if (err || services.length === 0) {
            result(null);
        } else {
            result(services[0]);
        }
    });
};

Services.create = function (data, result) {
    db.query(
        'SELECT * FROM services WHERE service_name = ?',
        [data.service_name],
        function (error, results) {
            if (error) {
                console.log(error);
                result({ error: 'Internal Server Error' });
            } else {
                if (results.length > 0) {
                    result({ error: 'Tên dịch vụ này đã được sử dụng' });
                } else {
                    db.query('INSERT INTO services SET ?', data, function (err, services) {
                        if (err) {
                            result({ error: 'Không thể thêm dữ liệu vào database' });
                        } else {
                            result({ id: services.insertId, ...data });
                        }
                    });
                }
            }
        }
    );
};

Services.remove = function (id, result) {
    db.query('DELETE FROM services WHERE id=?', id, function (err, services) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Services.update = function (services, result) {
    db.query(
        'UPDATE services SET service_name=?, price=?, unit =?, is_required=?, motel_id=? WHERE id=?',
        [
            services.service_name,
            services.price,
            services.unit,
            services.is_required,
            services.motel_id,
            services.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(services);
            }
        }
    );
};

module.exports = Services;
