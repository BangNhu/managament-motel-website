const createMailTransporter = require('./createMailTranporter');

const sendVerificationMail = (user) => {
    const transporter = createMailTransporter();
    const mailOptions = {
        from: '"Hệ thống quản lý nhà trọ NhuTK" <khanhnhu270101@gmail.com>',
        to: user.email,
        subject: 'Xác thực email bạn đã đăng ký tại nhutk.com',
        html: `<div>
                <p>
                    Xin chào ${user.landlord_name},
                </p>
                <p>
                    Chúng tôi muốn xác nhận rằng địa chỉ email này là chính xác và thuộc sở hữu của bạn. 
                    Để hoàn tất quá trình đăng ký và bắt đầu trải nghiệm Hệ thống quản lý nhà trọ NhuTK, 
                    bạn chỉ cần vào vào đường link dưới đây:
                </p>
                <a href="http://localhost:3000/verify-email?email_token=${user.email_token}">
                    Xác nhận email của bạn.
                </a>
                <p>Lưu ý rằng liên kết này sẽ hết hạn sau 15 phút, vì vậy hãy xác nhận ngay bây giờ để không bỏ lỡ cơ hội.</p>
                <p>Nếu bạn không tạo tài khoản trên Hệ thống quản lý nhà trọ NhuTK, xin vui lòng bỏ qua email này.</p>
                <p>Chân thành cảm ơn!</p>
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

module.exports = sendVerificationMail;
