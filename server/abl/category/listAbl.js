const categoryDao = require('../../dao/category-dao');

async function listAbl(req, res) {
    try {
        const categoryList = categoryDao.listAllCategories();

        res.json(categoryList)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = listAbl;