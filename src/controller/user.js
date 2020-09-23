const fs = require('fs');
const utils = require('../utils');

const getUser = (req, res, next) => {
  const { userID } = req.params;

  if (!utils.isSnowflake(userID)) {
    res.json({
      error: 'userid is not of type snowflake',
      code: 'TODO',
    })

    return;
  }

  if (fs.existsSync(`./data/users/${userID}.json`)) {
    const userData =JSON.parse(fs.readFileSync(`./data/users/${userID}.json`));

    res.json({
      id: userData.id,
      username: userData.username,
      avatar: userData.avatar,
      discriminator: userData.discriminator,
      public_flags: userData.public_flags,
    })

  } else {
    res.json({
      error: 'User not found',
      code: 'TODO',
    })
  }

  next();
};

module.exports = {
  getUser,
}
