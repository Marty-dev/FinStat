const Ajv = require('ajv');
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat('date-time', { validate: validateDateTime} );

const incomeDao = require('../../dao/income-dao.js');

const scheme = {
    type: 'object',
    properties: {
        date: { type: 'string', format: 'date-time' },
        note: { type: 'string' },
        amount: { type: 'number', minLength: 1 },
        category: { type: 'string' },
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
                code: "invalidIncome",
                message: "The income is invalid",
                validationErrors: ajv.errors,


            });
            return;
        }

        reqParams = incomeDao.createIncome(reqParams)
        res.json(reqParams);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = CreateAbl;