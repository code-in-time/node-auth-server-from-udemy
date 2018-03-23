const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Settup
// NOTE the address of the dev server
mongoose.connect('mongodb://localhost:27017/auth');


// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);



// server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on port,', port);