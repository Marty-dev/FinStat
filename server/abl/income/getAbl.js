const Ajv = require('ajv');
const ajv = new Ajv();

const incomeDao = require('../../dao/income-dao.js');

const scheme = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
    },
    required: ['id'],
    additionalProperties: false,
}

async function GetAbl(req, res) {
    try {
        let reqParams = req.query?.id ? req.query : req.body;

        const valid = ajv.validate(scheme, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "invalidIncome",
                message: "The income is invalid",
                validationErrors: ajv.errors,


            });
            return;
        }

        const income = incomeDao.getIncome(reqParams.id)
        if (!income) {
            res.status(404).json({
                code: "incomeNotFound",
                message: `The income ${reqParams.id} was not found`,
            });
            return;
        }

        res.json(reqParams);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = GetAbl;