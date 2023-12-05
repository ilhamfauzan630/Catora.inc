const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authController = require('./Back-End/Auth/authController');
const profileController = require('./Back-End/Profile/profileController');
const uploadController = require('./Back-End/Upload/uploadController');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/profile', profileController);
app.use('/upload', uploadController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});