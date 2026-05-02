const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async ({ to, subject, html, attachments  }) => {
    const mailOptions = {
        from: `"Passion Healthcare" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
        attachments   
    };
    return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };



// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: 'leevare.co.uk',  
//     port: 465,                   
//     secure: true, 
//     auth: {
//         user: 'lee@leevare.co.uk',
//         pass: 'Leevare@Ali@699@899'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// const sendEmail = async ({ to, subject, html, attachments  }) => {
//     try{
//         const mailOptions = {
//         from: `Passion Healthcare lee@leevare.co.uk`,
//         to,
//         subject,
//         html,
//         attachments   
//     };
//     console.log("sent")
//     return await transporter.sendMail(mailOptions);
//     }
//     catch(err){
//         console.log(err)
//     }
// };

// module.exports = { sendEmail };