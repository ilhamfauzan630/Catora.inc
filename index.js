const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const authController = require('./Back-End/Auth/authController');
const profileController = require('./Back-End/Profile/profileController');
const initializeSocket = require('./Back-End/Chat/socketController');
const uploadController = require('./Back-End/Upload/uploadController');

const app = express();
const server = http.createServer(app);

const port = 3000;

app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/profile', profileController);
app.use('/upload', uploadController);

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
