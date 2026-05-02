const express = require("express");
const { addSubscriber, removeSubscriber, getAllSubscribers } = require("../controllers/SubscriberController");
const { adminMiddleware } = require("../middleware/adminmiddleware");

const router = express.Router();

router.get("/getAllSubscribers", adminMiddleware, getAllSubscribers);
router.post("/addSubscriber", addSubscriber);
router.delete("/removeSubscriber", adminMiddleware, removeSubscriber);

module.exports = router;