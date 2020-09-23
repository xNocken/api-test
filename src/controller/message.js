const fs = require('fs');
const utils = require("../utils");

const createMessage = (req, res, next) => {
  const { body: { content, nonce }, params: { channelID }} = req;

  if (!utils.existChannel(channelID)) {
    res.json({
      error: 'unknown channel',
      code: 'TODO',
    });

    return;
  }

  // TODO: add attachment and embed support
  const message = {
    // TODO: right id
    author: {
      id: utils.generateSnowflake()
    },
    embeds: [],
    pinned: false,
    channel_id: channelID,
    content,
    timestamp: (new Date).toISOString(),
    flags: 0,
    attachments: [],
    mention_everyone: !!content.match(/\@everyone/),
    // TODO: Mention handling
    mentions: [],
    mention_roles: [],
    nonce: nonce ? nonce : null,
    id: utils.generateSnowflake(),
    type: 0,
    edited_timestamp: null,
  };

  const messages = JSON.parse(fs.readFileSync(`data/messages/${channelID}.json`));

  messages.push(message);

  fs.writeFileSync(`data/messages/${channelID}.json`, JSON.stringify(messages))

  res.json(message);
};

const getMessageById = (req, res, next) => {
  const { channelID , messageID} = req.params;

  if (!utils.existChannel(channelID)) {
    res.json({
      error: 'unknown channel',
      code: 'TODO',
    });

    return;
  }

  const messages = JSON.parse(fs.readFileSync(`data/messages/${channelID}.json`));

  for (let i = 0; i < messages.length; i += 1) {
    const message = messages[i];

    if (message.id === messageID) {
      res.json(message);
      return;
    }
  }

  res.json({
    error: 'unknown message',
    code: 'TODO',
  })
};

const getMessages = (req, res, next) => {
  const { query: { count }, params: { channelID }} = req;

  if (!utils.existChannel(channelID)) {
    res.json({
      error: 'unknown channel',
      code: 'TODO',
    });

    return;
  }

  const messages = JSON.parse(fs.readFileSync(`data/messages/${channelID}.json`));

  res.json(messages.splice((count || 50) * -1))
};

module.exports = {
  createMessage,
  getMessageById,
  getMessages,
}
