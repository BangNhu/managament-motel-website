module.exports = function (router) {
    var receiptExpenseController = require('../controllers/receipt_expense.controller');

    router.get('/receipt_expense/list', receiptExpenseController.get_list);
    router.get('/receipt_expense/detail/:id', receiptExpenseController.details);
    router.post('/receipt_expense/add', receiptExpenseController.add_receipt_expense);
    router.delete('/receipt_expense/delete/:id', receiptExpenseController.remove_receipt_expense);
    router.put('/receipt_expense/update', receiptExpenseController.update_receipt_expense);
};
