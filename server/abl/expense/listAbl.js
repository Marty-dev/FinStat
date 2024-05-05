const expenseDao = require('../../dao/expense-dao');

async function listAbl(req, res) {
    try {
        const expenseList = expenseDao.listAllExpenses();

        res.json(expenseList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = listAbl;