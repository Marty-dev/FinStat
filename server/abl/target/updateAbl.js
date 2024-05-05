const Ajv = require('ajv')
const ajv = new Ajv()
const validateDateTime = require("../../helpers/validate-date-time.js")
ajv.addFormat('date-time', { validate: validateDateTime} );

const targetDao = require('../../dao/target-dao');

const scheme = {
    type: 'object',
    properties: {
        validityFrom: { type: 'string', format: 'date-time' },
        validityTo: { type: 'string', format: 'date-time' },
        value: { type: 'number', minLength: 1 },
    },
    required: ['value'],
    additionalProperties: false,
}
async function UpdateAbl(req, res) {
    try {
        let target = req.body;

        const valid = ajv.validate(scheme, target);
        if (!valid) {
            res.status(400).json({
                code: "invalidTarget",
                message: "The target is invalid",
                validationErrors: ajv.errors,
            });
            return;
        }

        const updatedTarget = targetDao.updateTarget(target);

        if (!updatedTarget) {
            res.status(404).json({
                code: "targetNotFound",
                message: `The target ${target.id} was not found`,
            });
            return;
        }

        res.json(updatedTarget);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = UpdateAbl;