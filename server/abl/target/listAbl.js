const targetDao = require('../../dao/target-dao');

async function listAbl(req, res) {
    try {
        const targetList = targetDao.listAllTargets();

        res.json(targetList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = listAbl;