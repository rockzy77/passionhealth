const express = require('express');
const { sendContactEmail, sendSubscribeEmail, sendCareerEmail } = require('../controllers/ContactController');
const router = express.Router();
const {memory_upload} = require("../middleware/upload");


router.post('/contact', sendContactEmail);
router.post('/subscribeMail', sendSubscribeEmail);
router.post('/careerEmail', memory_upload.single('pdf') ,sendCareerEmail);

module.exports = router;