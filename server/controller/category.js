const express = require('express')
const router = express.Router()

const GetAbl = require('../abl/category/getAbl')
const ListAbl = require('../abl/category/listAbl')
const CreateAbl = require('../abl/category/createAbl')
const DeleteAbl = require('../abl/category/deleteAbl')

router.post("/create", CreateAbl)
router.post("/delete", DeleteAbl)
router.get("/list", ListAbl)
router.get("/get", GetAbl)

module.exports = router