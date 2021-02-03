const express = require('express');
const app = express();
const server = require('http').createServer(app);
const Path = require('path');

server.listen(7070, () => console.log('Server started at port : 7070', __dirname));
