const sequelize = require('../config/db');
const NEWS = require("./NewsModel");
const ADMIN = require("./AdminModel");
const SUBSCRIBER = require("./SubscriberModel")

module.exports = {
    sequelize,
    NEWS,
    ADMIN,
    SUBSCRIBER
}