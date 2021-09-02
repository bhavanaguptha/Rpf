const express = require('express');
const router = express.Router()

const controller = require('../controllers/duty_deployment')

router.post('/dutydeployment',controller.dutydeployement)
router.post('/duty_type_assignment',controller.duty_type_assignment)


module.exports = router

