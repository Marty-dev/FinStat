const Ajv = require('ajv')
const AddFormats = require('ajv-formats')
const ajv = new Ajv()
AddFormats(ajv)

const categoryDao = require('../../dao/category-dao')

const scheme = {
    type: 'object',
    properties: {
        id: { type: 'string', minLength: 32, maxLength: 32 },
        name: { type: 'string' }
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
                code: "invalidCategory",
                message: "The category is invalid",
                validationError: ajv.errors
            })
        }

        const category = categoryDao.getCategory(reqParams.id)

        if(!category) {
            return res.status(404).json({
                code: "categoryNotFound",
                message: `The category ${reqParams.id} was not found`
            })
        }

        res.json(category)
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

}

module.exports = getAbl