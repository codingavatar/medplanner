require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ', err);
  });

const apptSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  dr: String,
  location: String,
  questions: String
});

const conditionSchema = new mongoose.Schema({
  conditionId: Number,
  commonName: {
    type: String,
    required: true
  },
  synonyms: String,
  notes: String,
  links: String,
  appts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appt',
    required: true
  }]
});

const Appt = new mongoose.model('Appt', apptSchema);
const Condition = new mongoose.model('Condition', conditionSchema);

module.exports = { Appt, Condition };