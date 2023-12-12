const createMailTransporter = require('./createMailTranporter');

const sendResetPassword = (user) => {
    const transporter = createMailTransporter();
    const mailOptions = {
        from: '"Hệ thống quản lý nhà trọ NhuTK" <khanhnhu270101@gmail.com>',
        to: user.email,
        subject: `Đổi mật khẩu tài khoản ${user.email}`,
        html: `<div>
                <p>
                    Xin chào ${user.landlord_name},
                </p>
                <p>
                   Thực hiện đổi mật khẩu mới bằng cách ấn vào link dưới đây:
                </p>
                <a href="http://localhost:3000/reset-password?email=${user.email}?reset_token=${user.reset_token}">
                    Xác nhận email của bạn.
                </a>
                <p>Lưu ý rằng liên kết này sẽ hết hạn sau 15 phút, vì vậy hãy thực hiện ngay bây giờ.</p>
                <p>Trân trọng,</p>
                <p>Trần Khánh Như</p>
            </div>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Xác nhận đã được gửi');
        }
    });
};

module.exports = sendResetPassword;
