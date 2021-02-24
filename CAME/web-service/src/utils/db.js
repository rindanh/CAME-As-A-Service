const mongoose = require('mongoose');

const config = require('../config/db')

mongoose.Promise = global.Promise;

const connection = mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });

connection
  .then(db => {
    console.log(
      `Successfully connected to ${config.uri} MongoDB cluster`
    );
    return db;
  })
  .catch(err => {
    if (err.message.code === 'ETIMEDOUT') {
      console.log('Attempting to re-establish database connection.');
      mongoose.connect(config.uri);
    } else {
      console.log('Error while attempting to connect to database:');
      console.log(err);
      // ini kalo error ga ke exit
    }
  });

