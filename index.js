const http = require('https');
const fs = require('fs');
const app = require('./src/app');

const server = http.createServer({
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./cert.pem'),
},app);

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

app.set('port', 443);

server.listen(443);
