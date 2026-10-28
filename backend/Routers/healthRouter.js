const express = require('express');
const router = express.Router();
const controller = require('../Controllers/healthController');

router.get('/', controller.check);

module.exports = router;