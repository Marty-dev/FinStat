const express = require('express')
const router = express.Router()

const CreateAbl = require('../abl/category/createAbl')

router.post("/create", CreateAbl)

module.exports = router