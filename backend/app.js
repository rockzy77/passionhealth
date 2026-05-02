const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();
const multer = require('multer');
const { sequelize } = require('./models');


const adminRoutes = require("./routes/AdminRoute");
const newsRoutes = require("./routes/NewsRoute");
const subscriberRoute = require("./routes/SubscriberRoute");
const contactRoute = require("./routes/ContactRoute");

// Initialize express app
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Rate limiting
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, 
//     max: 100, 
//     message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api/', limiter);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1', adminRoutes);
app.use('/api/v1', newsRoutes);
app.use('/api/v1', subscriberRoute);
app.use('/api/v1', contactRoute);
app.get('/api/v1/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB for images and 10MB for resumes.'
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));



async function syncDB() {
    try {
        await sequelize.sync({ alter: true, force: process.env.DB_FORCE == "true" ? true : false, alter: true }); 
        console.log('✅ Database synced successfully.');
    } catch (error) {
        console.error('❌ Database sync error:', error);
    }
}

syncDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
});
