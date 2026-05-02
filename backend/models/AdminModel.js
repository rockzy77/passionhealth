const { DataType, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admins = sequelize.define("admin", {
    admin_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    admin_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    admin_email: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    admin_pass: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
});

module.exports = Admins;