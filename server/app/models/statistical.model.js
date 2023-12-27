const db = require('../common/connect');

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const Statistical = {
    info_all_motel: async function (landlord_id) {
        try {
            const blockMotelCount = await query(
                'SELECT COUNT(*) FROM block_motel JOIN motel ON block_motel.motel_id = motel.id WHERE motel.landlord_id=?',
                landlord_id
            );

            const bedsitCount = await query(
                'SELECT COUNT(*) FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE motel.landlord_id=?',
                landlord_id
            );

            const bedsitEmpty = await query(
                'SELECT COUNT(*) FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bedsit.status = 0 AND motel.landlord_id=?',
                landlord_id
            );

            const bedsitHired = await query(
                'SELECT COUNT(*) FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bedsit.status = 1 AND motel.landlord_id=?',
                landlord_id
            );

            const bedsitDeposit = await query(
                'SELECT COUNT(*) FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bedsit.status = 2 AND motel.landlord_id=?',
                landlord_id
            );

            const tenantCount = await query(
                'SELECT COUNT(*) FROM tenant JOIN motel ON tenant.motel_id = motel.id WHERE motel.landlord_id=?',
                landlord_id
            );

            return {
                blockMotelCount: blockMotelCount[0]['COUNT(*)'],
                bedsitCount: bedsitCount[0]['COUNT(*)'],
                bedsitEmpty: bedsitEmpty[0]['COUNT(*)'],
                bedsitHired: bedsitHired[0]['COUNT(*)'],
                bedsitDeposit: bedsitDeposit[0]['COUNT(*)'],
                tenantCount: tenantCount[0]['COUNT(*)'],
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

const StatisticalMotel = {
    info_motel: async function (motel_id) {
        try {
            const blockMotelCount = await query(
                'SELECT COUNT(*) FROM block_motel JOIN motel ON block_motel.motel_id = motel.id WHERE motel.id=?',
                motel_id
            );

            const bedsitCount = await query(
                'SELECT COUNT(*) FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE motel.id=?',
                motel_id
            );

            const bedsitEmpty = await query(
                'SELECT COUNT(*) FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bedsit.status = 0 AND motel.id=?',
                motel_id
            );

            const bedsitHired = await query(
                'SELECT COUNT(*) FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bedsit.status = 1 AND motel.id=?',
                motel_id
            );

            const bedsitDeposit = await query(
                'SELECT COUNT(*) FROM bedsit JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bedsit.status = 2 AND motel.id=?',
                motel_id
            );

            const tenantCount = await query(
                'SELECT COUNT(*) FROM tenant JOIN motel ON tenant.motel_id = motel.id WHERE motel.id=?',
                motel_id
            );

            return {
                blockMotelCount: blockMotelCount[0]['COUNT(*)'],
                bedsitCount: bedsitCount[0]['COUNT(*)'],
                bedsitEmpty: bedsitEmpty[0]['COUNT(*)'],
                bedsitHired: bedsitHired[0]['COUNT(*)'],
                bedsitDeposit: bedsitDeposit[0]['COUNT(*)'],
                tenantCount: tenantCount[0]['COUNT(*)'],
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

const StatisticalAllInOut = {
    all_in_out: async function (landlord_id, start_day, end_day) {
        try {
            const billUnPaidCount = await query(
                'SELECT COUNT(*) FROM bill JOIN bedsit ON bill.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bill.status=0 AND  bill.create_day BETWEEN ? AND ? AND motel.landlord_id=?',
                [start_day, end_day, landlord_id]
            );

            const billPaidCount = await query(
                'SELECT COUNT(*) FROM bill JOIN bedsit ON bill.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bill.status=1 AND  bill.create_day BETWEEN ? AND ? AND motel.landlord_id=?',
                [start_day, end_day, landlord_id]
            );

            const billTotal = await query(
                'SELECT SUM(total) AS totalSum FROM bill JOIN bedsit ON bill.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bill.pay_day IS NOT NULL AND  bill.pay_day BETWEEN ? AND ? AND motel.landlord_id=?',
                [start_day, end_day, landlord_id]
            );

            const recepitIn = await query(
                'SELECT SUM(monney) AS totalMonneyIn FROM receipt_expense JOIN motel ON receipt_expense.motel_id = motel.id WHERE transaction_type = 0 AND receipt_expense.date IS NOT NULL AND  receipt_expense.date BETWEEN ? AND ? AND motel.landlord_id=?',
                [start_day, end_day, landlord_id]
            );
            const recepitOut = await query(
                'SELECT SUM(monney) AS totalMonneyOut FROM receipt_expense JOIN motel ON receipt_expense.motel_id = motel.id  WHERE transaction_type = 1 AND receipt_expense.date IS NOT NULL AND  receipt_expense.date BETWEEN ? AND ? AND motel.landlord_id=?',
                [start_day, end_day, landlord_id]
            );

            return {
                billTotal: billTotal[0].totalSum,
                recepitIn: recepitIn[0].totalMonneyIn,
                recepitOut: recepitOut[0].totalMonneyOut,
                billUnPaidCount: billUnPaidCount[0]['COUNT(*)'],
                billPaidCount: billPaidCount[0]['COUNT(*)'],
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};
const StatisticalInOut = {
    in_out: async function (motel_id, start_day, end_day) {
        try {
            const billUnPaidCount = await query(
                'SELECT COUNT(*) FROM bill JOIN bedsit ON bill.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bill.status=0 AND  bill.create_day BETWEEN ? AND ? AND motel.id=?',
                [start_day, end_day, motel_id]
            );

            const billPaidCount = await query(
                'SELECT COUNT(*) FROM bill JOIN bedsit ON bill.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bill.status=1 AND  bill.create_day BETWEEN ? AND ? AND motel.id=?',
                [start_day, end_day, motel_id]
            );

            const billTotal = await query(
                'SELECT SUM(total) AS totalSum FROM bill JOIN bedsit ON bill.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE bill.pay_day IS NOT NULL AND  bill.pay_day BETWEEN ? AND ? AND motel.id=?',
                [start_day, end_day, motel_id]
            );

            const recepitIn = await query(
                'SELECT SUM(monney) AS totalMonneyIn FROM receipt_expense JOIN motel ON receipt_expense.motel_id = motel.id WHERE transaction_type = 0 AND receipt_expense.date IS NOT NULL AND  receipt_expense.date BETWEEN ? AND ? AND motel.id=?',
                [start_day, end_day, motel_id]
            );
            const recepitOut = await query(
                'SELECT SUM(monney) AS totalMonneyOut FROM receipt_expense JOIN motel ON receipt_expense.motel_id = motel.id  WHERE transaction_type = 1 AND receipt_expense.date IS NOT NULL AND  receipt_expense.date BETWEEN ? AND ? AND motel.id=?',
                [start_day, end_day, motel_id]
            );

            return {
                billTotal: billTotal[0].totalSum,
                recepitIn: recepitIn[0].totalMonneyIn,
                recepitOut: recepitOut[0].totalMonneyOut,
                billUnPaidCount: billUnPaidCount[0]['COUNT(*)'],
                billPaidCount: billPaidCount[0]['COUNT(*)'],
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

const StatisticalAllElectricWater = {
    get_all_electric_water: async function (landlord_id, start_day, end_day) {
        try {
            // const electricWaterDay = await query(
            //     "SELECT DISTINCT DATE_FORMAT(electricity_water.record_day, '%m/%Y') AS record_day  FROM electricity_water JOIN bedsit ON electricity_water.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE electricity_water.record_day BETWEEN ? AND ? AND motel.landlord_id=? ORDER BY record_day ASC",
            //     [start_day, end_day, landlord_id]
            // );

            // const amountElectric = await query(
            //     'SELECT DATE_FORMAT(electricity_water.record_day, "%m/%Y") AS month_year, SUM(electricity_water.amount_electricity) AS totalElectricity FROM electricity_water JOIN bedsit ON electricity_water.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE electricity_water.record_day BETWEEN ? AND ? AND motel.landlord_id=? GROUP BY month_year ORDER BY totalElectricity ASC',
            //     [start_day, end_day, landlord_id]
            // );

            // const amountWater = await query(
            //     'SELECT DATE_FORMAT(electricity_water.record_day, "%m/%Y") AS month_year, SUM(electricity_water.amount_water) AS totalWater FROM electricity_water JOIN bedsit ON electricity_water.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE electricity_water.record_day BETWEEN ? AND ? AND motel.landlord_id=? GROUP BY month_year ORDER BY totalWater ASC',
            //     [start_day, end_day, landlord_id]
            // );
            const amountElectricWater = await query(
                'SELECT DATE_FORMAT(electricity_water.record_day, "%m/%Y") AS month_year, SUM(electricity_water.amount_water) AS totalWater, SUM(electricity_water.amount_electricity) AS totalElectricity FROM electricity_water JOIN bedsit ON electricity_water.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE electricity_water.record_day BETWEEN ? AND ? AND motel.landlord_id=? GROUP BY month_year ORDER BY month_year ASC',
                [start_day, end_day, landlord_id]
            );

            return {
                // electricWaterDay: electricWaterDay,
                // amountElectric: amountElectric,
                // amountWater: amountWater,
                amountElectricWater: amountElectricWater,
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

const StatisticalElectricWater = {
    get_electric_water: async function (motel_id, start_day, end_day) {
        try {
            // const electricWaterDay = await query(
            //     "SELECT DISTINCT DATE_FORMAT(electricity_water.record_day, '%m/%Y') AS record_day  FROM electricity_water JOIN bedsit ON electricity_water.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE electricity_water.record_day BETWEEN ? AND ? AND motel.id=? ORDER BY record_day ASC",
            //     [start_day, end_day, motel_id]
            // );

            // const amountElectric = await query(
            //     'SELECT DATE_FORMAT(electricity_water.record_day, "%m/%Y") AS month_year, SUM(electricity_water.amount_electricity) AS totalElectricity FROM electricity_water JOIN bedsit ON electricity_water.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE electricity_water.record_day BETWEEN ? AND ? AND motel.id=? GROUP BY month_year ORDER BY totalElectricity ASC',
            //     [start_day, end_day, motel_id]
            // );

            // const amountWater = await query(
            //     'SELECT DATE_FORMAT(electricity_water.record_day, "%m/%Y") AS month_year, SUM(electricity_water.amount_water) AS totalWater FROM electricity_water JOIN bedsit ON electricity_water.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE electricity_water.record_day BETWEEN ? AND ? AND motel.id=? GROUP BY month_year ORDER BY totalWater ASC',
            //     [start_day, end_day, motel_id]
            // );
            const amountElectricWater = await query(
                'SELECT DATE_FORMAT(electricity_water.record_day, "%m/%Y") AS month_year, SUM(electricity_water.amount_water) AS totalWater, SUM(electricity_water.amount_electricity) AS totalElectricity FROM electricity_water JOIN bedsit ON electricity_water.bedsit_id = bedsit.id JOIN block_motel ON bedsit.block_motel_id = block_motel.id JOIN motel ON block_motel.motel_id = motel.id WHERE electricity_water.record_day BETWEEN ? AND ? AND motel.id=? GROUP BY month_year ORDER BY month_year ASC',
                [start_day, end_day, motel_id]
            );
            return {
                // electricWaterDay: electricWaterDay,
                // amountElectric: amountElectric,
                // amountWater: amountWater,
                amountElectricWater,
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

module.exports = {
    Statistical,
    StatisticalMotel,
    StatisticalAllInOut,
    StatisticalInOut,
    StatisticalElectricWater,
    StatisticalAllElectricWater,
};
