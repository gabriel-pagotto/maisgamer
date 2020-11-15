const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const router = express.Router();

dotenv.config();

require('./src/database');

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(router);
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/public')));

require('./src/routes')(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
