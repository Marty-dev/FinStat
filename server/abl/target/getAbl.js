const Ajv = require('ajv')
const AddFormats = require('ajv-formats')
const ajv = new Ajv()
AddFormats(ajv)

const targetDao = require('../../dao/target-dao')

const scheme = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
    },
    required: ['id'],
    additionalProperties: false
}

async function getAbl(req, res) {
    try {
        const reqParams = req.query?.id ? req.query : req.body

        const valid = ajv.validate(scheme, reqParams)
        if (!valid) {
            return res.status(400).json({
                code: "invalidTarget",
                message: "The target is invalid",
                validationError: ajv.errors
            })
        }

        const target = targetDao.getTarget(reqParams.id)

        if(!target) {
            return res.status(404).json({
                code: "targetNotFound",
                message: `The target ${reqParams.id} was not found`
            })
        }

        res.json(target)
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

}

module.exports = getAbl