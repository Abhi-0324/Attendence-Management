const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Student } = require('./models/student');

const app = express();

// Connect to MongoDB
const uri = 'mongodb+srv://20bcs092:20bcs092Attendence@cluster0.woxiouc.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.log('Error connecting to MongoDB Atlas: ', error);
});

// Use body-parser middleware
app.use(bodyParser.json());

// Create a new student
app.post('/students', async (req, res, next) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Get a student by id
app.get('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Update attendance for a student
app.put('/students/:id/attendance', async (req, res, next) => {
  try {
    const { attendedClasses } = req.body;

    // Find the student by id
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update the attended classes
    student.attendedClasses = attendedClasses;
    await student.save();

    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Delete a student
app.delete('/students/:id', async (req, res, next) => {
  try {
    const result = await Student.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
