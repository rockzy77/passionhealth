const { v4: uuidv4 } = require("uuid");
const { SUBSCRIBER } = require("../models");
const { sendEmail } = require("../service/mail");
const { sendSubscribeEmail } = require("./ContactController");

exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await SUBSCRIBER.findAll({
            order: [["createdAt", "DESC"]]
        });
        return res.status(200).json({ success: true, subscribers });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

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


exports.addSubscriber = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Check for duplicate
        const existing = await SUBSCRIBER.findOne({ where: { sb_email: email } });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already subscribed" });
        }

        await SUBSCRIBER.create({
            sb_id: uuidv4(),   // ← fixed: was require("uuidv4").uuid()
            sb_email: email
        });


        // await sendEmail({
        //     to: email,
        //     subject: `You're subscribed! Welcome to Passion Healthcare`,
        //     html: subscribeConfirmHtml(email)
        // });


        return res.status(200).json({ success: true, message: "Subscribed successfully!" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

exports.removeSubscriber = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const sb = await SUBSCRIBER.findOne({ where: { sb_email: email } });

        if (!sb) {   // ← fixed: was calling .destroy() without null check
            return res.status(404).json({ success: false, message: "Subscriber not found" });
        }

        await sb.destroy();
        return res.status(200).json({ success: true, message: "Subscriber removed" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};