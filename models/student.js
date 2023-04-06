const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  attendedClasses: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };