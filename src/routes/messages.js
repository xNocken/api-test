const express = require('express');
const message = require('../controller/message');

const router = express.Router();

router.get('/:channelID(\\d+)/messages', message.getMessages);
router.post('/:channelID(\\d+)/messages', message.createMessage);
router.get('/:channelID(\\d+)/messages/:messageID(\\d+)', message.getMessageById);
// router.delete('/:messageID(\\d+)', message.deleteMessageById);
// router.patch('/:messageID(\\d+)', message.editMessageById);

module.exports = router;
