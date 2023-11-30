const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./Back-End/Auth/authController');
const profileController = require('./Back-End/Profile/profileController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/auth', authController);
app.use('/profile', profileController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
