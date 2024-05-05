const Ajv = require('ajv');
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat('date-time', { validate: validateDateTime} );

const expenseDao = require('../../dao/expense-dao.js');

const scheme = {
    type: 'object',
    properties: {
        date: { type: 'string', format: 'date-time' },
        note: { type: 'string' },
        amount: { type: 'number', minLength: 1 },
        category: { type: 'string', minLength: 1 },
    },
    required: ['amount', 'category', 'date'],
    additionalProperties: false,
}

async function CreateAbl(req, res) {
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

        reqParams = expenseDao.createExpense(reqParams)
        res.json(reqParams);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = CreateAbl;