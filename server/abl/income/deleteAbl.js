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

async function DeleteAbl(req, res) {
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

        reqParams = incomeDao.removeIncome(reqParams)
        res.json(reqParams);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = DeleteAbl;