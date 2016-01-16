import Mongoose from 'mongoose';

const db = Mongoose.connect('mongodb://localhost/request');

db.connection.on('error', (err) => {
  console.error(`MongoDB error: ${err}`);
});

module.exports = db
