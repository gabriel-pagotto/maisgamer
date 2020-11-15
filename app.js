const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const router = express.Router();
const port = 3000;

require('./src/database');

dotenv.config();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(router);
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/global')));

require('./src/routes')(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
