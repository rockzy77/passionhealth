const jwt = require("jsonwebtoken");
const { ADMIN } = require("../models");

exports.adminMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await ADMIN.findOne({
            where: {
                admin_id: decoded.admin_id
            }
        });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        req.admin = admin;
        req.decoded = decoded;
        req.token = token;
        next();
    }
    catch (err) {
        console.log(err.name)
        if (err.name === "TokenExpiredError") {
            return res.status(403).json({
                success: false,
                message: "EXPIRED",
                error: "EXPIRED"
            });
        }
        res.status(403).json({ success: false, message: "Invalid Token" });
    }
}


