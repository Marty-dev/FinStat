const Ajv = require('ajv');
const ajv = new Ajv();

const categoryDao = require('../../dao/category-dao.js');

const scheme = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
        name: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
}

async function deleteAbl(req, res) {
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

        reqParams = categoryDao.removeCategory(reqParams.id)
        res.json(reqParams);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = deleteAbl;