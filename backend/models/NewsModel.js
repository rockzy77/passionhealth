const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const News = sequelize.define("news", {
    news_id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    news_title: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    news_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    news_img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    news_desc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = News;