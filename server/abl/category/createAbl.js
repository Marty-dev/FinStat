const Ajv = require('ajv');
const AddFormats = require('ajv-formats');
const ajv = new Ajv();

const categoryDao = require('../../dao/category-dao.js');

const scheme = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
    },
    required: ['name'],
    additionalProperties: false,
}

async function createAbl(req, res) {
    try {
        let category = req.body;

        const valid = ajv.validate(scheme, category);
        if (!valid) {
            res.status(400).json({
                code: "invalidCategory",
                message: "The category is invalid",
                validationErrors: ajv.errors,
            });
            return;
        }

        category = categoryDao.createCategory(category)
        res.json(category);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = createAbl;