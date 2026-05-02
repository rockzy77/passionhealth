const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Subscriber = sequelize.define("subscriber", {
    sb_id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    sb_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Subscriber;