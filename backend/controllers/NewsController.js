const { v4: uuidv4 } = require("uuid");
const { NEWS } = require("../models");

exports.createNews = async (req, res) => {
    const { title, description } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No Image Provided" });
        }
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        await NEWS.create({
            news_id: uuidv4(),
            news_title: title,
            news_desc: description,
            news_date: new Date(),
            news_img: fileUrl
        });
        return res.status(200).json({ success: true, message: "News created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const n = await NEWS.findAll({ where: { is_active: true } });
        return res.status(200).json({ success: true, news: n });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

exports.getNewsByNewsId = async (req, res) => {
    const { news_id } = req.params;
    try {
        const n = await NEWS.findOne({ where: { news_id } });
        if (!n) return res.status(404).json({ success: false, message: "News not found" });
        return res.status(200).json({ success: true, news: n });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

exports.editNews = async (req, res) => {
    const { news_id } = req.params;           // ← get from URL param
    const { title, description } = req.body;
    try {
        if (!news_id) {
            return res.status(400).json({ success: false, message: "No news_id provided" });
        }
        const n = await NEWS.findOne({ where: { news_id } });  // ← was using wrong variable
        if (!n) {
            return res.status(404).json({ success: false, message: "News not found" });
        }

        const updateData = { news_title: title, news_desc: description };

        // Only update image if a new one was uploaded
        if (req.file) {
            updateData.news_img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        await n.update(updateData);
        return res.status(200).json({ success: true, message: "News updated" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

exports.deleteNews = async (req, res) => {
    const { news_id } = req.params;
    try {
        const n = await NEWS.findOne({ where: { news_id } });
        if (!n) return res.status(404).json({ success: false, message: "News not found" });
        await NEWS.destroy({ where: { news_id } });
        return res.status(200).json({ success: true, message: "News deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};