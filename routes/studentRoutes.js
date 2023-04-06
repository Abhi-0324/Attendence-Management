const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

router.post("/register", studentController.register);
router.post("/login", studentController.login);
router.get("/attendance", studentController.getAttendance);
router.put("/attendance", studentController.updateAttendance);
router.delete("/account", studentController.deleteAccount);

module.exports = router;