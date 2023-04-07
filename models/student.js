const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  attendance: {
    type: Map,
    of: [{ type: Date }],
    default: {},
  },
  totalClasses: {
    type: Map,
    of: { type: Number },
    default: {},
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
