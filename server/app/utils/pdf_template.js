module.exports = ({ id }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Title</title>
        <style>
            /* Global Styles */
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
    
            /* Stack Styles */
            .stack-container {
                display: flex;
                flex-direction: row;
                gap: 10px;
            }
    
            .stack-item {
                border: 2px solid #a61713;
                width: 300px;
                height: 40px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 1px 1px 1px #888;
                margin-bottom: 30px;
                color: #2f2f3a;
            }
    
            /* Table Styles */
            .table {
                border: 1px solid #1c1c1c;
                width: 100%;
                margin-top: 10px;
            }
    
            .table-header {
                background-color: #a48e8e;
                color: #fff;
                height: 50px;
                display: flex;
                align-items: center;
            }
    
            .table-row {
                background-color: #ffffff;
                color: #1c1c1c;
                margin: 10px 0;
                display: flex;
                align-items: center;
            }
    
            .table-row p {
                width: 15%;
                margin: 0;
            }
    
            .table-row input {
                width: 50%;
            }
    
            /* Other Styles */
            .total-section {
                margin: 20px 0 5px 0;
                display: flex;
                justify-content: space-between;
            }
    
            .input-section {
                margin: 5px 0;
                display: flex;
                justify-content: space-between;
            }
    
            .total-section p,
            .input-section p {
                width: 48%;
                text-align: end;
            }
    
            .total-section p {
                font-weight: bold;
                font-size: 20px;
            }
    
            /* TextField Styles */
            [contenteditable="true"] {
                width: 100%;
                padding: 8px;
                margin-top: 5px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 4px;
                min-height: 30px;
            }
        </style>
    </head>
    <body>
        <!-- Stack Container -->
        <div class="stack-container">
            <div class="stack-item">
                <p>NGÀY LẬP HÓA ĐƠN: <span style="font-weight: bold; color: #a61713;">{formattedDate}</span></p>
            </div>
            <div class="stack-item">
                <p>PHÒNG: <span style="font-weight: bold; color: #a61713;">3</span></p>
            </div>
        </div>
    
        <!-- Bảng Điện Nước -->
        <p style="font-weight: bold; font-size: 17px; margin-bottom: 10px;">Bảng Điện Nước</p>
        <div class="table">
            <div class="table-header">
                <p>Tên chi phí</p>
                <p>Đơn giá</p>
                <p>Số mới</p>
                <p>Số cũ</p>
                <p>Đơn vị tính</p>
                <p>Số dùng</p>
                <p>Thành tiền</p>
            </div>
            <div class="table-row">
                <!-- Add your Điện Nước table rows here -->
            </div>
        </div>
    
        <!-- Bảng Dịch Vụ -->
        <p style="font-weight: bold; font-size: 17px; margin: 10px 0;">Bảng Dịch Vụ</p>
        <div class="table">
            <div class="table-header">
                <p>Tên chi phí</p>
                <p>Đơn giá</p>
                <p>Đơn vị tính</p>
                <p>Số lượng</p>
                <p>Thành tiền</p>
            </div>
            <div class="table-row">
                <!-- Add your Dịch Vụ table rows here -->
            </div>
        </div>
    
        <!-- Other Sections -->
        <div class="total-section">
            <p>Tiền phòng</p>
            <p>800000</p>
        </div>
        <div class="input-section">
            <p>Chi phí phát sinh</p>
            <p contenteditable="true">0</p>
        </div>
        <div class="input-section">
            <p>Nợ cũ</p>
            <p contenteditable="true">0</p>
        </div>
        <div class="total-section">
            <p style="font-weight: bold; font-size: 20px;">Tổng cộng</p>
            <p style="font-weight: bold; font-size: 20px;">1027500</p>
        </div>
        <p contenteditable="true" name="record_day" style="width: 100%;" placeholder="Ghi chú"></p>
    
    </body>
    </html>
    `;
};
