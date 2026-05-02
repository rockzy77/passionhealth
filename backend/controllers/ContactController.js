const { sendEmail } = require('../service/mail');

// ─── Shared Brand Styles ───────────────────────────────────────────────────
const brandStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background-color: #f4f6f9; font-family: 'DM Sans', sans-serif; }
  .wrapper {
    max-width: 620px; margin: 40px auto; background: #ffffff;
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
  .header {
    background: linear-gradient(135deg, #0a4f6e 0%, #0d7ea0 60%, #10a8c4 100%);
    padding: 44px 40px 36px;
    text-align: center;
  }
  .header .logo-mark {
    display: inline-block;
    width: 52px; height: 52px;
    background: rgba(255,255,255,0.15);
    border: 2px solid rgba(255,255,255,0.35);
    border-radius: 14px;
    line-height: 50px;
    font-size: 24px;
    margin-bottom: 16px;
  }
  .header h1 {
    font-family: 'Playfair Display', Georgia, serif;
    color: #ffffff;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
  .header p {
    color: rgba(255,255,255,0.75);
    font-size: 13px;
    margin-top: 6px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .body { padding: 40px 40px 32px; }
  .greeting {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 22px;
    color: #0a4f6e;
    margin-bottom: 16px;
  }
  .body p {
    color: #444c5c;
    font-size: 15px;
    line-height: 1.75;
    margin-bottom: 14px;
  }
  .divider {
    border: none;
    border-top: 1px solid #e8edf3;
    margin: 28px 0;
  }
  .info-card {
    background: #f0f7fb;
    border-left: 4px solid #0d7ea0;
    border-radius: 8px;
    padding: 18px 20px;
    margin: 20px 0;
  }
  .info-card p { margin-bottom: 6px; color: #334155; font-size: 14px; }
  .info-card p:last-child { margin-bottom: 0; }
  .info-card strong { color: #0a4f6e; }
  .cta-btn {
    display: inline-block;
    background: linear-gradient(135deg, #0a4f6e, #0d7ea0);
    color: #ffffff !important;
    text-decoration: none;
    padding: 13px 30px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    margin-top: 8px;
  }
  .badge {
    display: inline-block;
    background: #e6f5fa;
    color: #0a4f6e;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .footer {
    background: #f8fafc;
    border-top: 1px solid #e8edf3;
    padding: 28px 40px;
    text-align: center;
  }
  .footer p { color: #94a3b8; font-size: 12px; line-height: 1.7; }
  .footer a { color: #0d7ea0; text-decoration: none; }
`;

const emailShell = (headerTitle, headerSubtitle, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${headerTitle}</title>
  <style>${brandStyles}</style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo-mark">💙</div>
      <h1>Passion Healthcare</h1>
      <p>${headerSubtitle}</p>
    </div>
    <div class="body">
      ${bodyContent}
    </div>
    <div class="footer">
      <p>
        Passion Healthcare · Compassionate Care, Every Step of the Way<br/>
        <a href="#">www.passionhealthcare.com</a> &nbsp;|&nbsp;
        <a href="mailto:hello@passionhealthcare.com">hello@passionhealthcare.com</a>
      </p>
      <p style="margin-top:10px; color:#cbd5e1;">
        You're receiving this email because you interacted with Passion Healthcare.<br/>
        © ${new Date().getFullYear()} Passion Healthcare. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

// ─── Internal notification (Contact) ──────────────────────────────────────
const internalContactHtml = ({ name, email, message }) => emailShell(
  'New Contact Message',
  'Internal Notification',
  `
    <div class="badge">● New Contact Submission</div>
    <p class="greeting">You have a new message.</p>
    <p>A visitor has submitted the <strong>Contact form</strong> on your website. Here are the details:</p>
    <div class="info-card">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#0d7ea0;">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p style="margin-top:8px; padding-top:8px; border-top:1px solid #c7dfe8;">${message}</p>
    </div>
    <p>Head over and give it a look when you get a chance. 🙂</p>
    <a href="mailto:${email}" class="cta-btn">Reply to ${name}</a>
  `
);

// ─── Internal notification (Career) — now includes resume note ────────────
const internalCareerHtml = ({ name, email, phone, address, resumeFilename }) => emailShell(
  'New Career Application',
  'Internal Notification',
  `
    <div class="badge">● New Career Application</div>
    <p class="greeting">You have a new application.</p>
    <p>Someone has applied through the <strong>Careers form</strong> on your website. Here are their details:</p>
    <div class="info-card">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#0d7ea0;">${email}</a></p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Resume:</strong> ${resumeFilename ? `📎 ${resumeFilename} (attached)` : 'Not provided'}</p>
    </div>
    <p>Head over and give it a look when you get a chance. 🙂</p>
    <a href="mailto:${email}" class="cta-btn">Reply to ${name}</a>
  `
);

// ─── Contact auto-reply ────────────────────────────────────────────────────
const contactAutoReplyHtml = (name) => emailShell(
  'Message Received',
  "We'll be in touch shortly",
  `
    <p class="greeting">Hello, ${name} 👋</p>
    <p>Thank you for getting in touch with <strong>Passion Healthcare</strong>. We truly value your message and appreciate you taking the time to reach out to us.</p>
    <p>Our dedicated team has received your enquiry and will review it carefully. You can expect a personalised response from us within <strong>1–2 business days</strong>.</p>
    <hr class="divider"/>
    <p style="font-size:14px; color:#64748b;">
      In the meantime, feel free to explore our resources or learn more about how we can support your healthcare journey.
    </p>
    <a href="https://www.passionhealthcare.co.uk" class="cta-btn">Visit Our Website</a>
    <hr class="divider"/>
    <p>Warm regards,<br/><strong style="color:#0a4f6e;">The Passion Healthcare Team</strong></p>
  `
);

// ─── Subscribe confirmation ────────────────────────────────────────────────
const subscribeConfirmHtml = (name) => emailShell(
  'Subscription Confirmed',
  'Welcome to our community',
  `
    <p class="greeting">Welcome aboard, ${name}! 🎉</p>
    <p>You've successfully subscribed to <strong>Passion Healthcare</strong>. We're delighted to have you as part of our growing community.</p>
    <p>Here's what you can look forward to as a subscriber:</p>
    <div class="info-card">
      <p>🏥 &nbsp;<strong>Health Tips & Insights</strong> — Expert advice delivered to your inbox</p>
      <p>📋 &nbsp;<strong>Service Updates</strong> — Be the first to know about new offerings</p>
      <p>💡 &nbsp;<strong>Wellness Resources</strong> — Curated content to support your wellbeing</p>
    </div>
    <p>Our newsletters are sent periodically — never overwhelming, always valuable.</p>
    <a href="https://www.passionhealthcare.co.uk" class="cta-btn">Explore Our Services</a>
    <hr class="divider"/>
    <p>With gratitude,<br/><strong style="color:#0a4f6e;">The Passion Healthcare Team</strong></p>
  `
);

// ─── Career auto-reply ─────────────────────────────────────────────────────
const careerAutoReplyHtml = (name) => emailShell(
  'Application Received',
  'Thank you for your interest',
  `
    <p class="greeting">Dear ${name},</p>
    <p>Thank you for expressing your interest in joining <strong>Passion Healthcare</strong>. We're always looking for passionate, talented individuals who share our commitment to compassionate care.</p>
    <p>Your application has been received and is currently under review by our team. We will carefully consider your profile and get back to you within <strong>5–7 business days</strong>.</p>
    <div class="info-card">
      <p>📌 &nbsp;Ensure your contact details are up to date</p>
      <p>📌 &nbsp;Keep an eye on your inbox (and spam folder) for updates</p>
      <p>📌 &nbsp;Feel free to reach out if you have any questions</p>
    </div>
    <p>We appreciate your patience and look forward to the possibility of welcoming you to our team.</p>
    <a href="https://www.passionhealthcare.co.uk" class="cta-btn">Visit Website</a>
    <hr class="divider"/>
    <p>Best wishes,<br/><strong style="color:#0a4f6e;">Passion Healthcare — Talent Acquisition Team</strong></p>
  `
);


// ─── Controllers ──────────────────────────────────────────────────────────

const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        await sendEmail({
            to: process.env.TO_EMAIL,
            subject: `📬 New Contact Message from ${name}`,
            html: internalContactHtml({ name, email, message })
        });

        // await sendEmail({
        //     to: email,
        //     subject: `We've received your message, ${name} — Passion Healthcare`,
        //     html: contactAutoReplyHtml(name)
        // });

        res.json({ success: true, message: 'Email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};

const sendSubscribeEmail = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    try {
        await sendEmail({
            to: email,
            subject: `You're subscribed! Welcome to Passion Healthcare, ${name}`,
            html: subscribeConfirmHtml(name)
        });

        res.json({ success: true, message: 'Email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};

const sendCareerEmail = async (req, res) => {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Resume is optional but expected — multer puts it on req.file
    const resumeFile = req.file;

    console.log(req.file)

    try {
        // Build attachment array for nodemailer if resume was uploaded
        const attachments = resumeFile
            ? [{
                filename: resumeFile.originalname,
                content: resumeFile.buffer,       // works with diskStorage
                // If using memoryStorage, swap path for: content: resumeFile.buffer
              }]
            : [];

        // Notify you (admin) with the resume attached
        await sendEmail({
            to: process.env.TO_STAFF_EMAIL,
            subject: `💼 New Career Application from ${name}`,
            html: internalCareerHtml({
                name, email, phone, address,
                resumeFilename: resumeFile?.originalname
            }),
            attachments  // ← pass this through to your sendEmail / nodemailer call
        });

        // Auto-reply to the applicant (no attachment needed)
        // await sendEmail({
        //     to: email,
        //     subject: `Application Received — Passion Healthcare`,
        //     html: careerAutoReplyHtml(name)
        // });

        res.json({ success: true, message: 'Application submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
};

module.exports = { sendContactEmail, sendCareerEmail, sendSubscribeEmail };