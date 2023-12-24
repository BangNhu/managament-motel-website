const db = require('../common/connect');

const Contract = function (contract) {
    this.id = contract.id;
    this.bedsit_id = contract.bedsit_id;
    this.start_day = contract.start_day;
    this.end_day = contract.end_day;
    this.tenant_represent_id = contract.tenant_represent_id;
    this.deposits = contract.deposits;
    this.content = contract.content;
    this.staff_id = contract.staff_id;
};

const BedsitTenant = function (bedsit_tenant) {
    this.bedsit_id = bedsit_tenant.bedsit_id;
    this.tenant_id = bedsit_tenant.tenant_id;
};

Contract.get_all = function (result) {
    db.query('SELECT * FROM contract', function (err, contracts) {
        if (err) {
            result(null);
        } else {
            result();
        }
    });
};

Contract.getById = function (id, result) {
    db.query('SELECT * FROM contract WHERE id=?', id, function (err, contracts) {
        if (err || contracts.length === 0) {
            result(null);
        } else {
            result(contracts[0]);
        }
    });
};

Contract.create = function (data, result) {
    // Kiểm tra nếu có bedsit_id trùng nhau trong khoảng thời gian từ start_day đến end_day
    db.query(
        'SELECT COUNT(*) AS count_overlap FROM contract WHERE bedsit_id = ? AND (start_day <= ? AND end_day >= ?)',
        [data.bedsit_id, data.end_day, data.start_day],
        function (error, overlapResult) {
            if (error) {
                console.log(error);
                result({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
            }

            const countOverlap = overlapResult[0].count_overlap;
            if (countOverlap > 0) {
                result({ error: 'Phòng trọ này đã được tạo hợp đồng' });
            }

            db.query('INSERT INTO contract SET ?', data, function (err, contract) {
                if (err) {
                    console.log(err);
                    result({ error: 'Không thể thêm dữ liệu vào cơ sở dữ liệu' });
                }

                //result({ id: contract.insertId, ...data });
                // addTenantsToBedsit(data.bedsit_id, tenantsData, contractId, result);
                else {
                    db.query(
                        'UPDATE bedsit SET current_quantity=current_quantity+1, status=1 WHERE id=?',
                        data.bedsit_id,
                        function (err, result) {
                            if (err) {
                                console.error(err);
                            }
                            if (result.affectedRows > 0) {
                                console.log('Cập nhật thành công');
                            } else {
                                console.log('Không có dòng nào được cập nhật');
                            }
                        }
                    );
                }
            });
        }
    );
};

Contract.remove = function (id, result) {
    db.query('DELETE FROM bedsit WHERE id=?', id, function (err, contract) {
        if (err) {
            result(null);
        } else {
            result('Xóa dữ liệu có id' + id + 'thành công');
        }
    });
};

Contract.update = function (contract, result) {
    db.query(
        'UPDATE contract SET bedsit_id=?, start_day=?, end_day =?, tenant_represent_id=?, deposits=?, content=?, staff_id=? WHERE id=?',
        [
            contract.bedsit_id,
            contract.start_day,
            contract.end_day,
            contract.tenant_represent_id,
            contract.deposits,
            contract.content,
            contract.staff_id,
            contract.id,
        ],
        function (err) {
            if (err) {
                result(null);
            } else {
                result(contract);
            }
        }
    );
};

//Thêm khách trọ vào phòng trọ
BedsitTenant.create = function (data, result) {
    db.query('INSERT INTO bedsit_tenant SET?', data, function (err, bedsit_tenant) {
        if (err) {
            console.log(err);
            result({ error: 'Không thể thêm dữ liệu vào cơ sở dữ liệu' });
        } else {
            result({ id: bedsit_tenant.insertId, ...data });
        }
    });
};

// Contract.get_contract_by_landlord = function (id, result) {
//     db.query('SELECT * FROM contract WHERE landlord_id=?', id, function (err, contracts) {
//         if (err) {
//             result(null);
//         } else {
//             result(contracts);
//         }
//     });
// };

// Contract.get_contract_by_staff = function (id, result) {
//     db.query('SELECT * FROM contract WHERE staff_id=?', id, function (err, contracts) {
//         if (err) {
//             result(null);
//         } else {
//             result(contracts);
//         }
//     });
// };

Contract.get_contract_by_landlord = function (id, result) {
    db.query(
        'SELECT contract.*, tenant.tenant_name AS tenant_name, bedsit.bedsit_name AS bedsit_name, motel.motel_name AS motel_name FROM contract JOIN tenant ON contract.tenant_represent_id = tenant.id JOIN bedsit ON contract.bedsit_id = bedsit.id JOIN motel ON tenant.motel_id = motel.id WHERE motel.landlord_id = ?',
        id,
        function (err, contracts) {
            if (err) {
                result(null);
            } else {
                result(contracts);
            }
        }
    );
};

Contract.get_contract_by_staff = function (id, result) {
    db.query(
        'SELECT contract.*, tenant.tenant_name AS tenant_name, bedsit.bedsit_name AS bedsit_name, motel.motel_name AS motel_name FROM contract JOIN tenant ON contract.tenant_represent_id = tenant.id JOIN bedsit ON contract.bedsit_id = bedsit.id JOIN motel ON tenant.motel_id = motel.id WHERE motel.staff_id = ?',
        id,
        function (err, contracts) {
            if (err) {
                result(null);
            } else {
                result(contracts);
            }
        }
    );
};
module.exports = Contract;
