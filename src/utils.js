const fs = require('fs');

let idsGenerated = 1;

const generateSnowflake = () => {
  const timeStampByteLength = 42;
  const lastBinByteLength = 12;
  const epoch = 1564610400000;

  const timeStamp = (new Date()).getTime() - epoch;
  const timeStampBin = '0'.repeat(timeStampByteLength - timeStamp.toString(2).length) + timeStamp.toString(2);

  const workerIdBin = '00001';
  const processIdBin = '00000';

  const lastBin = '0'.repeat(lastBinByteLength - idsGenerated.toString(2).length) + idsGenerated.toString(2);

  idsGenerated += 1;

  return parseInt(
    timeStampBin +
    workerIdBin +
    processIdBin +
    lastBin,
    2
  ).toString();
};

const isSnowflake = (snowflakeStr) => {
  const snowflake  = parseInt(snowflakeStr, 10);
  const epoch = 1564610400000;

  const snowflakeBin = '0'.repeat(64 - snowflake.toString(2).length) + snowflake.toString(2);

  const timestamp = parseInt(snowflakeBin.slice(0, 42), 2) + epoch;
  const workerId = parseInt(snowflakeBin.slice(43, 47), 2);
  const processId = parseInt(snowflakeBin.slice(48, 52), 2);
  const increment = parseInt(snowflakeBin.slice(53, 64), 2);

  if (timestamp > epoch
    && typeof workerId === 'number'
    && processId === 0
    && increment >= 0) {
    return true;
  }

  return false;
};

const btoa = (string) => Buffer.from(string, 'base64').toString('ascii');
const atob = (string) => Buffer.from(string).toString('base64');

const existChannel = (channelId) => {
  if (!isSnowflake(channelId)) {
    return false;
  }

  return fs.existsSync(`./data/channels/${channelId}.json`);
};

module.exports = {
  generateSnowflake,
  isSnowflake,
  btoa,
  atob,
  existChannel,
}
