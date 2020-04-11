require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');


const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = process.env['DB_URL_DEV'];

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log('MONGO IS CONNECTED'))
  .catch(err => console.error(err));

app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))