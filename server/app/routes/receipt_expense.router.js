module.exports = function (router) {
    var receiptExpenseController = require('../controllers/receipt_expense.controller');

    router.get('/receipt-expense/list', receiptExpenseController.get_list);
    router.get('/receipt-expense/detail/:id', receiptExpenseController.details);
    router.get('/receipt-expense/list-by-landlord/:id', receiptExpenseController.list_by_landlord);
    router.get('/receipt-expense/list-by-staff/:id', receiptExpenseController.list_by_staff);
    router.post('/receipt-expense/add', receiptExpenseController.add_receipt_expense);
    router.delete('/receipt-expense/delete/:id', receiptExpenseController.remove_receipt_expense);
    router.put('/receipt-expense/update', receiptExpenseController.update_receipt_expense);
};
