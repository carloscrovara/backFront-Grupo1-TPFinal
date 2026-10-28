const express = require('express')
const healthController = require('../Controllers/healthController')
const healthRouter = express.Router()

healthRouter.get('/', healthController.check)

module.exports = healthRouter;