const fs = require('fs');
const utils = require('../utils');
const channelTest = require('../models/channel');

const createChannel = (req, res, next) => {
  const { body: { recipients } } = req;
  const id = utils.generateSnowflake();

  const channelInfo = {
    recipients,
    id,
    // TODO: set right
    owner_id: utils.generateSnowflake(),
    type: 1,
    last_massage_id: null,
  };

  const isChannelValid = channelTest(channelInfo);

  if (!isChannelValid) {
    res.json({
      'error': 'An error occured. Check your parameters and retry',
      code: 'TODO',
    })

    next();
    return;
  }

  if (!fs.existsSync(`data/channels/${id}.json`)) {
    fs.writeFileSync(`data/channels/${id}.json`, JSON.stringify(channelInfo))
    fs.writeFileSync(`data/messages/${id}.json`, '[]');
  }

  res.json(channelInfo);
  next();
};

const getChannel = (req, res, next) => {
  const { channelID: id } = req.params;

  if (fs.existsSync(`data/channels/${id}.json`)) {
    res.json(JSON.parse(fs.readFileSync(`data/channels/${id}.json`)));
  } else {
    res.statusCode = 404;
    res.json({
      error: 'Not found',
      code: 404,
    })
  }

  next();
};

module.exports = {
  createChannel,
  getChannel,
}
