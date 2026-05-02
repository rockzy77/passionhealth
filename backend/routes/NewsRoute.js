const express = require("express");
const { adminMiddleware } = require("../middleware/adminmiddleware");
const {
    createNews, getAllNews, getNewsByNewsId, editNews, deleteNews
} = require("../controllers/NewsController");
const { upload } = require("../middleware/upload");
const router = express.Router();

router.post("/createNews",           adminMiddleware, upload.single("image"), createNews);
router.get("/getAllNews",             getAllNews);
router.get("/getNewsById/:news_id",  getNewsByNewsId);
router.put("/editNews/:news_id",     adminMiddleware, upload.single("image"), editNews); // ← PUT, not GET
router.delete("/deleteNews/:news_id",adminMiddleware, deleteNews);                       // ← DELETE, not GET

module.exports = router;