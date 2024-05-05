const express = require('express')
const router = express.Router()

const GetAbl = require('../abl/target/getAbl')
const ListAbl = require('../abl/target/listAbl')
const CreateAbl = require('../abl/target/createAbl')
const UpdateAbl = require('../abl/target/updateAbl')

router.post("/create", CreateAbl)
router.post("/update", UpdateAbl)
router.get("/list", ListAbl)
router.get("/get", GetAbl)

module.exports = router