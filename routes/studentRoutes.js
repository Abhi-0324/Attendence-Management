const express = require("express");
const router = express.Router();
const { register, login, getAttendance, updateAttendance, deleteAccount } = require("../controllers/studentController");


// Routes for student authentication
router.post("/register", register);
router.post("/login", login);

// Routes for authenticated students

router.get("/attendance", getAttendance);
router.patch("/attendance", updateAttendance);
router.delete("/delete", deleteAccount);

module.exports = router;