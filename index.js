const http = require('http');
const fs = require('fs');
const app = require('./src/app');

const server = http.createServer(app);

const foldersToCreate = [
  './data',
  './data/channels',
  './data/users',
  './data/messages',
];

foldersToCreate.forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
});

app.set('port', 80);

server.listen(80);
