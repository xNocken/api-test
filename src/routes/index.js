const express = require('express');

const channelRouter = require('./channels');
const messageRouter = require('./messages');
const userRouter = require('./users');

const router = express.Router();

router.use('/channels', channelRouter);
router.use('/channels', messageRouter);
router.use('/users', userRouter);

module.exports = router;
