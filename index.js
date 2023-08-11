const express = require('express');
const cors = require('cors');
const dbConfig = require('./config/db')

const app = express();

const routes = require('./routes')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

dbConfig();

app.use(routes);

app.listen(3000, () => console.log('Server is running on port 3000...'));
