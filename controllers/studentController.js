const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if student with the same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Student with this email already exists" });
    }

    // Hash the password and create a new student
    const hashedPassword = await bcrypt.hash(password, 12);
    const newStudent = await Student.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: "Student registration successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student with the given email exists
    const existingStudent = await Student.findOne({ email });
    if (!existingStudent) {
      return res.status(404).json({ message: "Student with this email does not exist" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingStudent.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JSON web token and return it in the response
    const token = jwt.sign({ email: existingStudent.email, id: existingStudent._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ result: existingStudent, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAttendance = async (req, res) => {
  try {
    const { id } = req.student;

    // Find the student by ID and return their attendance data
    const student = await Student.findById(id).select("attendance");

    return res.status(200).json(student.attendance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.student;
    const { date } = req.body;

    // Find the student by ID and update their attendance data
    const updatedStudent = await Student.findByIdAndUpdate(id, { $addToSet: { attendance: date } }, { new: true });

    return res.status(200).json(updatedStudent.attendance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.student;

    // Find the student by ID and delete their account
    await Student.findByIdAndDelete(id);

    return res.status(200).json({ message: "Student account deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getAttendance,
  updateAttendance,
  deleteAccount,
};
