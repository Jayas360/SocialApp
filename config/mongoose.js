const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost:27017/${env.db}`);

const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and runnong then print the message
db.once('open', function(){
    console.log('successfully connected to db');
})