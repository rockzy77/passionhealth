const bcrypt = require("bcrypt");
const { ADMIN } = require("../models");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 10);

        await ADMIN.create({
            admin_name: name,
            admin_email: email,
            admin_pass: hashedPass
        })

        return res.status(200).json({
            success: true,
            message: "Admin created"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.validateToken = async (req, res) => {
    return res.status(200).json({
        success: true,
        admin: {
            admin_id:   req.admin.admin_id,
            admin_name: req.admin.admin_name,
            admin_email: req.admin.admin_email
        }
    });
};

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const admin = await ADMIN.findOne({
            where: {
                admin_email: email
            }
        });

        if (!admin) {
            return res.status(500).json({
                success: false,
                message: "No admin found"
            })
        }

        const hashedPass = await bcrypt.compare(password, admin.admin_pass);

        if (hashedPass) {
            const token = jwt.sign({admin_id: admin.admin_id}, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })
            return res.status(200).json({
                success: true,
                token: token
            })
        }
        else {
            return res.status(200).json({
                success: false,
                message: "Invalid credential"
            })
        }


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}