const express = require('express')
const router = express.Router()

const GetAbl = require('../abl/income/getAbl')
const ListAbl = require('../abl/income/listAbl')
const CreateAbl = require('../abl/income/createAbl')
const DeleteAbl = require('../abl/income/deleteAbl')
const UpdateAbl = require('../abl/income/updateAbl')

router.post("/create", CreateAbl)
router.post("/delete", DeleteAbl)
router.post("/update", UpdateAbl)
router.get("/list", ListAbl)
router.get("/get", GetAbl)

module.exports = router