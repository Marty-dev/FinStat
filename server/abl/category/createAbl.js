const Ajv = require('ajv');
const AddFormats = require('ajv-formats');
const ajv = new Ajv();
AddFormats(ajv);

const categoryDao = require('../../dao/category-dao.js');

const scheme = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32},
        name: { type: 'string', minLength: 1 },
    },
    required: ['name'],
    additionalProperties: false,
}

async function createAbl(req, res) {
    try {
        let reqParams = req.body;

        const valid = ajv.validate(scheme, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "invalidCategory",
                message: "The category is invalid",
                validationErrors: ajv.errors,
            });
            return;
        }

        reqParams = categoryDao.createCategory(reqParams)
        res.json(reqParams);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = createAbl;