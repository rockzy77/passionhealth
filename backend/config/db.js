const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    // host: 'db-postgres', 
    host: process.env.DB_URL,
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        // ssl: {
        //   require: true,
        //   rejectUnauthorized: false, // only for development; use true with proper certs in prod
        // },
    },
    logging: false,
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL connected successfully!');
    } catch (error) {
        console.error(process.env.DB_URL);
        const https = require('https');
        https.get('https://api.ipify.org', (res) => {
            res.on('data', (data) => console.log('My IP: ' + data.toString()));
        });
        console.error('❌ Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
