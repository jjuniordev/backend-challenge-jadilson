const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/verify', controller.verifyToken);

router.get('/metrics', controller.metrics);

module.exports = router;