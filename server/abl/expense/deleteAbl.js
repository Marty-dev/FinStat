const Ajv = require('ajv');
const ajv = new Ajv();


const expenseDao = require('../../dao/expense-dao.js');

const scheme = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
    },
    required: ['id'],
    additionalProperties: false,
}

async function DeleteAbl(req, res) {
    try {
        let reqParams = req.body;

        const valid = ajv.validate(scheme, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "invalidExpense",
                message: "The expense is invalid",
                validationErrors: ajv.errors,


            });
            return;
        }

        reqParams = expenseDao.removeExpense(reqParams)
        res.json(reqParams);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = DeleteAbl;