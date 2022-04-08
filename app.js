const Server = require('./models/server');

require('dotenv').config();
// respond with "hello world" when a GET request is made to the homepage

const server = new Server();

server.listen();