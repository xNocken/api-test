const { isSnowflake } = require('../utils');

const test = (channel) => {
  if (!channel.id) {
    return false;
  }

  if (!isSnowflake(channel.id)) {
    return false;
  }

  if (!channel.recipients.length) {
    return false;
  }

  let invalid = false;

  channel.recipients.forEach((recipient, index) => {
    if (!isSnowflake(recipient)) {
      invalid = false;
    }
  });

  if (invalid) {
    return false;
  }

  if (!isSnowflake(channel.owner_id)) {
    return false;
  }

  if (!isSnowflake(channel.last_message_id) && channel.last_message_id === null) {
    return false;
  }

  return true;
};

module.exports = test;
