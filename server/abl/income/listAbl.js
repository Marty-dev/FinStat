const incomeDao = require('../../dao/income-dao');

async function listAbl(req, res) {
    try {
        const incomeList = incomeDao.listAllIncomes();

        res.json(incomeList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = listAbl;