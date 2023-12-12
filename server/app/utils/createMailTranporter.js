const nodemailer = require('nodemailer');

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'khanhnhu270101@gmail.com',
            pass: 'svobcblvslmvbowg',
        },
    });
    return transporter;
};

module.exports = createMailTransporter;
