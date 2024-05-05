const express = require('express')
const router = express.Router()

const GetAbl = require('../abl/expense/getAbl')
const ListAbl = require('../abl/expense/listAbl')
const CreateAbl = require('../abl/expense/createAbl')
const DeleteAbl = require('../abl/expense/deleteAbl')
const UpdateAbl = require('../abl/expense/updateAbl')

router.post("/create", CreateAbl)
router.post("/delete", DeleteAbl)
router.post("/update", UpdateAbl)
router.get("/list", ListAbl)
router.get("/get", GetAbl)

module.exports = router