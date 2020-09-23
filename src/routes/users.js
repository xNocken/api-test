const express = require('express');
const user = require('../controller/user');

const router = express.Router();

router.get('/:userID(\\d+)', user.getUser);

module.exports = router;
