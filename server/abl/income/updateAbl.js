const Ajv = require('ajv')
const ajv = new Ajv()
const validateDateTime = require("../../helpers/validate-date-time.js")
ajv.addFormat('date-time', { validate: validateDateTime} );

const incomeDao = require('../../dao/income-dao.js');

const scheme = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
        date: { type: 'string', format: 'date-time' },
        note: { type: 'string' },
        amount: { type: 'number', minLength: 1 },
        category: { type: 'string', minLength: 1 },
    },
    required: ['id'],
    additionalProperties: false,
}
async function UpdateAbl(req, res) {
    try {
        let income = req.body;

        const valid = ajv.validate(scheme, income);
        if (!valid) {
            res.status(400).json({
                code: "invalidIncome",
                message: "The income is invalid",
                validationErrors: ajv.errors,
            });
            return;
        }

        const updatedIncome = incomeDao.updateIncome(income);

        if (!updatedIncome) {
            res.status(404).json({
                code: "incomeNotFound",
                message: `The income ${income.id} was not found`,
            });
            return;
        }

        res.json(updatedIncome);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = UpdateAbl;