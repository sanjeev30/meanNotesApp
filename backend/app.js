const express = require('express');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/posts');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes-app', { useNewUrlParser: true })
  .then(() => {
    console.log('Succesfully connected to database!');
  })
  .catch(() => {
    console.log('Error connecting to database');
  });

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use('/api/posts',postRoutes);

module.exports = app;
