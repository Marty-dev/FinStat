const Ajv = require('ajv')
const ajv = new Ajv()
const validateDateTime = require("../../helpers/validate-date-time.js")
ajv.addFormat('date-time', { validate: validateDateTime} );

const expenseDao = require('../../dao/expense-dao');

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
        let expense = req.body;

        const valid = ajv.validate(scheme, expense);
        if (!valid) {
            res.status(400).json({
                code: "invalidExpense",
                message: "The expense is invalid",
                validationErrors: ajv.errors,
            });
            return;
        }

        const updatedExpense = expenseDao.updateExpense(expense);

        if (!updatedExpense) {
            res.status(404).json({
                code: "expenseNotFound",
                message: `The expense ${expense.id} was not found`,
            });
            return;
        }

        res.json(updatedExpense);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = UpdateAbl;