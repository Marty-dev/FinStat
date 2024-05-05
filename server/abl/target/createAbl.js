const Ajv = require('ajv');
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat('date-time', { validate: validateDateTime} );

const targetDao = require('../../dao/target-dao');

const scheme = {
    type: 'object',
    properties: {
        validityFrom: { type: 'string', format: 'date-time' },
        validityTo: { type: 'string', format: 'date-time' },
        value: { type: 'number', minLength: 1 },
    },
    required: ['validityFrom', 'validityTo', 'value'],
    additionalProperties: false,
}

async function createAbl(req, res) {
    try {
        let reqParams = req.body;

        const valid = ajv.validate(scheme, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "invalidTarget",
                message: "The target is invalid",
                validationErrors: ajv.errors,
            });
            return;
        }

        reqParams = targetDao.createTarget(reqParams)
        res.json(reqParams);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports = createAbl;