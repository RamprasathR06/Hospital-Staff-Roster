const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true }
});

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  shifts: [shiftSchema]
});

module.exports = mongoose.model('Staff', staffSchema);
