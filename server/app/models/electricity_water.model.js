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

/*
Qui tắc hoạt động của chốt điện nước:
    - Kiểm tra phòng này đã được thêm chỉ số điện nước trong hợp đồng chưa. (Cũng không cần thiết lắm vì khi có hợp đồng thì nút button Chốt điện nước mới ấn được).
    - Nếu rồi thì kiểm tra: chỉ số nhập vào hiện tại phải lớn hơn chỉ số trước đó.
    - Chỉ cho phép 1 phòng/tháng có một chỉ số điện nước, nếu người dùng nhập nhiều lần trong tháng thì thực hiện update chỉ số trong tháng đó
    - Thực hiện thêm mới chỉ số điện nước khi tháng hiện tại khác với tháng của dữ liệu trước đó.
*/
// ElectricityWater.add_electric_water = function (data, result) {
//     db.query(
//         'SELECT * FROM electricity_water WHERE bedsit_id = ? ORDER BY record_day DESC LIMIT 2',
//         data.bedsit_id,
//         function (err, dataset) {
//             if (err) {
//                 result({ error: 'Chưa thêm chỉ số vào hợp đồng' });
//                 console.log('err', err);
//             } else {
//                 if (dataset && dataset.length > 0) {
//                     const lastRecordDay = dataset[0];
//                     const oldRecordDay = dataset[1]; //là tháng trước của tháng lastRecordDay
//                     console.log('lastRecordDay', lastRecordDay);
//                     if (lastRecordDay.index_electricity > data.index_electricity) {
//                         result({
//                             error: 'Chỉ số điện cũ lớn hơn chỉ số điện vừa nhập',
//                             index_electric_old: lastRecordDay.index_electricity,
//                             index_water_old: lastRecordDay.index_water,
//                         });
//                     } else if (lastRecordDay.index_water > data.index_water) {
//                         result({
//                             error: 'Chỉ số nước cũ lớn hơn chỉ số nước vừa nhập',
//                             index_electric_old: lastRecordDay.index_electricity,
//                             index_water_old: lastRecordDay.index_water,
//                         });
//                     } else {
//                         //Lấy tháng
//                         const currentMonth = new Date(data.record_day).getMonth();
//                         const lastRecordMonth = new Date(lastRecordDay.record_day).getMonth();
//                         if (currentMonth == lastRecordMonth) {
//                             //Tính số điện nước dùng
//                             const amount_electric =
//                                 data.index_electricity - oldRecordDay.index_electricity;
//                             const amount_water = data.index_water - oldRecordDay.index_water;
//                             db.query(
//                                 'UPDATE electricity_water SET index_electricity=?, index_water=?, amount_electricity=?, amount_water=? where record_day=?',
//                                 [
//                                     data.index_electricity,
//                                     data.index_water,
//                                     amount_electric,
//                                     amount_water,
//                                     lastRecordDay.record_day,
//                                 ],
//                                 function (err, electricity_water) {
//                                     if (err) {
//                                         console.log('first', err);
//                                         result({
//                                             error: 'Không thể cập nhật dữ liệu vào database',
//                                         });
//                                         console.log(err);
//                                     } else {
//                                         console.log('cập nhật');
//                                         result({
//                                             index_electric_old: oldRecordDay.index_electricity,
//                                             index_water_old: oldRecordDay.index_water,
//                                             amount_electric: amount_electric,
//                                             amount_water: amount_water,
//                                         });
//                                     }
//                                 }
//                             );
//                         } else {
//                             //tính số điện nước dùng
//                             const amount_electric =
//                                 data.index_electricity - lastRecordDay.index_electricity;
//                             const amount_water = data.index_water - lastRecordDay.index_water;
//                             db.query(
//                                 'INSERT INTO electricity_water SET record_day=?, index_electricity=?, index_water=?, amount_electricity=?, amount_water=?',
//                                 [
//                                     data.record_day,
//                                     data.index_electricity,
//                                     data.index_water,
//                                     amount_electric,
//                                     amount_water,
//                                 ],
//                                 function (err, electricity_water) {
//                                     if (err) {
//                                         result({ error: 'Không thể thêm dữ liệu vào database' });
//                                         console.log(err);
//                                     } else {
//                                         console.log('thêm');
//                                         result({
//                                             index_electric_old: lastRecordDay.index_electricity,
//                                             index_water_old: lastRecordDay.index_water,
//                                             amount_electric: amount_electric,
//                                             amount_water: amount_water,
//                                         });
//                                     }
//                                 }
//                             );
//                         }
//                     }
//                 } else {
//                     console.log('error');
//                     result({ error: 'Không tồn tại' });
//                 }
//             }
//         }
//     );
//     // db.query('INSERT INTO electricity_water SET ?', data, function (err, electricity_water) {
//     //     if (err) {
//     //         result({ error: 'Không thể thêm dữ liệu vào database' });
//     //         console.log(err);
//     //     } else {
//     //         result({ id: electricity_water.insertId, ...data });
//     //     }
//     // });
// };

ElectricityWater.add_electric_water = function (data, result) {
    db.query(
        'SELECT * FROM electricity_water WHERE bedsit_id = ? ORDER BY record_day DESC LIMIT 2',
        data.bedsit_id,
        function (err, dataset) {
            if (err) {
                result({ error: 'Chưa thêm chỉ số vào hợp đồng' });
                console.log('err', err);
            } else {
                if (dataset && dataset.length > 0) {
                    const lastRecordDay = dataset[0];
                    const oldRecordDay = dataset[1]; //là tháng trước của tháng lastRecordDay
                    console.log('lastRecordDay', lastRecordDay);
                    if (lastRecordDay.index_electricity > data.index_electricity) {
                        result({
                            error: 'Chỉ số điện cũ lớn hơn chỉ số điện vừa nhập',
                            index_electric_old: lastRecordDay.index_electricity,
                            index_water_old: lastRecordDay.index_water,
                        });
                    } else if (lastRecordDay.index_water > data.index_water) {
                        result({
                            error: 'Chỉ số nước cũ lớn hơn chỉ số nước vừa nhập',
                            index_electric_old: lastRecordDay.index_electricity,
                            index_water_old: lastRecordDay.index_water,
                        });
                    } else {
                        //Lấy tháng
                        db.query(
                            'INSERT INTO electricity_water SET ?',
                            data,
                            function (err, electricity_water) {
                                if (err) {
                                    result({ error: 'Không thể thêm dữ liệu vào database' });
                                    console.log(err);
                                } else {
                                    result({ id: electricity_water.insertId, ...data });
                                }
                            }
                        );
                    }
                } else {
                    console.log('error');
                    result({ error: 'Không tồn tại' });
                }
            }
        }
    );
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

ElectricityWater.get_by_bedsit = function (id, result) {
    db.query(
        'SELECT electricity-water.* bedsit.bedsit_name as bedsit_name FROM electricity_water JOIN bedsit ON electricity-water.bedsit_id = bedsit.id',
        id,
        function (err, electricity_waters) {
            if (err) {
                result(null);
            } else {
                result(electricity_waters);
            }
        }
    );
};

//Lấy ra chỉ số điện nước cũ và chỉ số điện nước mới để lập hóa đơn
ElectricityWater.get_old_new = function (id, result) {
    db.query(
        'SELECT * FROM electricity_water WHERE bedsit_id=? ORDER BY record_day DESC LIMIT 2',
        [id],
        function (err, dataset) {
            if (err) {
                console.log('lỗi', err);
                return null;
            } else {
                newRecordDay = dataset[0];
                lastRecordDay = dataset[1];
                index_electric_new = dataset[0].index_electricity;
                index_water_new = dataset[0].index_water;
                index_electric_old = dataset[1].index_electricity;
                index_water_old = dataset[1].index_water;
                amount_electric = index_electric_new - index_electric_old;
                amount_water = index_water_new - index_water_old;
                result({
                    index_electric_new: index_electric_new,
                    index_water_new: index_water_new,
                    index_electric_old: index_electric_old,
                    index_water_old: index_water_old,
                    amount_electric: amount_electric,
                    amount_water: amount_water,
                });
            }
        }
    );
};
module.exports = ElectricityWater;
