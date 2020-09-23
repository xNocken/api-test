const express = require('express');

const channelController = require('../controller/channel');
const router = express.Router();

router.post('/', channelController.createChannel);
router.get('/:channelID(\\d+)', channelController.getChannel);

module.exports = router;
