const db = require('../common/connect');

const Contract = function (contract) {
    this.id = contract.id;
    this.bedsit_id = contract.bedsit_id;
    this.end_day = contract.bedsit_id;
    this.tenant_represent_id = contract.tenant_represent_id;
    this.deposits = contract.deposits;
    this.content = contract.content;
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
    db.query('INSERT INTO contract SET ?', data, function (err, contract) {
        if (err) {
            result({ error: 'Không thể thêm dữ liệu vào database' });
            console.log(err);
        } else {
            result({ id: contract.insertId, ...data });
        }
    });
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
        'UPDATE contract SET bedsit_id=?, start_day=?, end_day =?, tenant_represent_id=?, deposits=?, content=? WHERE id=?',
        [
            contract.bedsit_id,
            contract.start_day,
            contract.end_day,
            contract.tenant_represent_id,
            contract.deposits,
            contract.content,
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

module.exports = Contract;
