var {
    Statistical,
    StatisticalMotel,
    StatisticalAllInOut,
    StatisticalInOut,
    StatisticalAllElectricWater,
    StatisticalElectricWater,
} = require('../models/statistical.model');

exports.info_all_motel = async (req, res) => {
    const landlordId = req.params.id; // Giả sử ID của chủ nhà được truyền qua tham số URL

    try {
        const statistics = await Statistical.info_all_motel(landlordId);

        if (statistics) {
            res.json(statistics);
        } else {
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.info_motel = async (req, res) => {
    const motelId = req.params.id; // Giả sử ID của chủ nhà được truyền qua tham số URL

    try {
        const statistics = await StatisticalMotel.info_motel(motelId);

        if (statistics) {
            res.json(statistics);
        } else {
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.all_in_out = async (req, res) => {
    const landlordId = req.body.id; // Giả sử ID của chủ nhà được truyền qua tham số URL
    const start_day = req.body.start_day;
    const end_day = req.body.end_day;
    try {
        const statistics = await StatisticalAllInOut.all_in_out(landlordId, start_day, end_day);

        if (statistics) {
            res.json(statistics);
        } else {
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.in_out = async (req, res) => {
    const motelId = req.body.id; // Giả sử ID của chủ nhà được truyền qua tham số URL
    const start_day = req.body.start_day;
    const end_day = req.body.end_day;
    try {
        const statistics = await StatisticalInOut.in_out(motelId, start_day, end_day);

        if (statistics) {
            res.json(statistics);
        } else {
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.get_all_electric_water = async (req, res) => {
    const motelId = req.body.id; // Giả sử ID của chủ nhà được truyền qua tham số URL
    const start_day = req.body.start_day;
    const end_day = req.body.end_day;
    try {
        const statistics = await StatisticalAllElectricWater.get_all_electric_water(
            motelId,
            start_day,
            end_day
        );

        if (statistics) {
            res.json(statistics);
        } else {
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.get_electric_water = async (req, res) => {
    const motelId = req.body.id; // Giả sử ID của chủ nhà được truyền qua tham số URL
    const start_day = req.body.start_day;
    const end_day = req.body.end_day;
    try {
        const statistics = await StatisticalElectricWater.get_electric_water(
            motelId,
            start_day,
            end_day
        );

        if (statistics) {
            res.json(statistics);
        } else {
            res.status(500).json({ error: 'Failed to fetch statistics' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
