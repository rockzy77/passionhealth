const express = require("express");
const { createAdmin, adminLogin, validateToken } = require("../controllers/AdminController");
const { adminMiddleware } = require("../middleware/adminmiddleware");

const router = express.Router();

router.post("/createAdmin", createAdmin);
router.post("/adminLogin", adminLogin);
router.get("/validateToken", adminMiddleware, validateToken); 

module.exports = router;