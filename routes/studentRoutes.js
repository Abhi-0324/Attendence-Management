const express = require("express");
const router = express.Router();
const { Student } = require('../models/student');

const register = async (req, res, next) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email, password });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    next(err);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const { id, attendedClasses } = req.body;

    // Find the student by id
    const student = await Student.findById(id);
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
};

const deleteAccount = async (req, res, next) => {
  try {
    const result = await Student.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
};

router.post("/register", register);
router.post("/login", login);
router.get("/attendance", getAttendance);
router.put("/attendance", updateAttendance);
router.delete("/account", deleteAccount);

module.exports = router;
