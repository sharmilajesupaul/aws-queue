import mongoose from '../../config/mongoose';

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  htmlBody: String,
  url: String,
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date
  }
});

module.exports = mongoose.model('Request', requestSchema);
