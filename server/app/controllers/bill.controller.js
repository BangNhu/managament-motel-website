var Bill = require('../models/bill.model');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const pdfTemplate = require('../utils/pdf_template');

exports.get_list = function (req, res) {
    Bill.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.details = function (req, res) {
    Bill.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
};

//body-parser
exports.add_bill = function (req, res) {
    var data = req.body;

    Bill.create(data, function (response) {
        res.send({ result: response });
    });
};

exports.remove_bill = function (req, res) {
    var id = req.params.id;
    Bill.remove(id, function (response) {
        res.send({ result: response });
    });
};

exports.update_bill = function (req, res) {
    var data = req.body;
    Bill.update(data, function (response) {
        res.send({ result: response });
    });
};

exports.create_pdf = (req, res) => {
    const { id } = req.body;
    const filePath = 'invoice.pdf';
    pdf.create(pdfTemplate(id), {}).toFile(filePath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error creating PDF');
        }
        console.log('PDF created successfully at:', filePath);
        res.json({ message: 'PDF created successfully' });
    });
};

exports.fetch_invoice_pdf = (req, res) => {
    const filePath = path.join(__dirname, 'server', 'invoice.pdf');

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Internal Server Error');
            }
        });
    } else {
        res.status(404).send('File not found');
    }
};
