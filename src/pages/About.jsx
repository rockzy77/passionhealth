import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { sendContactForm } from "../apis/email";

// ── VALUE ICONS ─────────────────────────────────────────────
const RespectIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
);

const SafetyIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
);

const InvolvementIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
);

const QualityIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
);

const ListeningIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
    </svg>
);

const AccountabilityIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
    </svg>
);

const ImprovementIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    </svg>
);

const TrustIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
);

// ── BREADCRUMB + HERO ───────────────────────────────────────
const AboutHero = () => (
    <section className="a-hero">
        <div className="a-hero-inner">
            <div className="a-breadcrumb">
                <a href="#">Home</a>
                <span>/</span>
                <span>About Us</span>
            </div>
            <h1 className="a-hero-title">About Passion Healthcare</h1>
            <p className="a-hero-sub">
                Providing compassionate, professional homecare services to families across Leicester and<br />
                surrounding areas since 2012.
            </p>
        </div>
    </section>
);

// ── VISION / STORY ──────────────────────────────────────────
const Vision = () => (
    <section className="a-vision">
        <div className="a-vision-inner">
            <div className="a-vision-images">
                <img src="/homecare2.png" alt="Caregiver with elderly lady" className="a-img-top" />
                <img src="/homecare3.png" alt="Caregiver helping elderly man" className="a-img-bottom" />
            </div>
            <div className="a-vision-text">
                <div className="a-label">OUR VISION</div>
                <h2 className="a-vision-title">Founded on Compassion</h2>
                <p className="a-vision-body">
                    Passion Healthcare was started in 2012 by friends who felt that they could use their knowledge and
                    experience to provide a better type of health care service. They both had experience of working in
                    the social health care industry and in private business. They recognised that not only do staff
                    need to be trained, but that they required support and supervision to apply the knowledge that they
                    had gained, enabling them to work confidently and autonomously in the community and institutional
                    setting. It is their belief that by concentrating on supporting their staff they will enable their
                    business to flourish and be recognised as a leading provider of quality care in Leicestershire.
                </p>
                <p className="a-vision-bold">
                    Passion Healthcare strive to be the best we can be.
                </p>
            </div>
        </div>
    </section>
);

// ── CORE VALUES ─────────────────────────────────────────────
const values = [
    { icon: <RespectIcon />,       title: "Respect",              desc: "Service users deserve our respect. We honor the dignity and individuality of every person we care for." },
    { icon: <SafetyIcon />,        title: "Safety",               desc: "Service users have a right to be kept safe. We ensure comprehensive safety measures in all our care practices." },
    { icon: <InvolvementIcon />,   title: "Involvement",          desc: "Service users need to be involved in their care planning. We work together to create personalized care plans." },
    { icon: <QualityIcon />,       title: "Quality",              desc: "Service users should receive a high-quality service. We maintain the highest standards in everything we do." },
    { icon: <ListeningIcon />,     title: "Listening",            desc: "Service users must be listened to. We actively listen to understand needs, concerns, and preferences." },
    { icon: <AccountabilityIcon />,title: "Accountability",       desc: "Service users have a right to complain when we get things wrong and expect quick, effective resolution." },
    { icon: <ImprovementIcon />,   title: "Continuous Improvement",desc: "We strive for continuous improvement in our services, processes, and care delivery standards." },
    { icon: <TrustIcon />,         title: "Trust",                desc: "We understand that trust is important, especially when allowing a stranger access to your home." },
];

const CoreValues = () => (
    <section className="a-values">
        <div className="a-values-inner">
            <h2 className="a-values-title">Our Core Values</h2>
            <p className="a-values-sub">The principles that guide our care every day</p>
            <div className="a-values-grid">
                {values.map((v, i) => (
                    <div className="a-value-card" key={i}>
                        <div className="a-value-icon">
                            {v.icon}
                        </div>
                        <h3 className="a-value-name">{v.title}</h3>
                        <p className="a-value-desc">{v.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ── COMMENT FORM ────────────────────────────────────────────
const CommentForm = () => {
    const [form, setForm] = useState({ name: "", email: "", comment: "", saveInfo: false, agree: false });
    const [submitted, setSubmitted] = useState(false);

    const handle = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        const result = await sendContactForm(form.name, form.email, JSON.stringify(form));
        if (result.success) setSubmitted(true);
        else alert("Couldn't submit the form");
    };

    return (
        <section className="a-comment-section">
            <div className="a-comment-inner">
                <h2 className="a-comment-title">Leave a Comment</h2>
                <p className="a-comment-sub">
                    We'd love to hear your thoughts about our services or answer any questions you might have.
                </p>
                <div className="a-form-card">
                    {submitted ? (
                        <div className="a-success-msg">
                            <div className="a-success-icon">✓</div>
                            <h3>Thank you for your comment!</h3>
                            <p>We'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="a-form">
                            <div className="a-form-row">
                                <div className="a-form-group">
                                    <label className="a-form-label">Full Name <span>*</span></label>
                                    <input type="text" name="name" value={form.name} onChange={handle} placeholder="Enter your full name" className="a-form-input" required />
                                </div>
                                <div className="a-form-group">
                                    <label className="a-form-label">Email Address <span>*</span></label>
                                    <input type="email" name="email" value={form.email} onChange={handle} placeholder="Enter your email address" className="a-form-input" required />
                                </div>
                            </div>
                            <div className="a-form-group a-full-width">
                                <label className="a-form-label">Your Comment <span>*</span></label>
                                <textarea name="comment" value={form.comment} onChange={handle} placeholder="Share your thoughts or ask us a question..." className="a-form-textarea" rows={7} required />
                            </div>
                            <div className="a-form-check">
                                <input type="checkbox" id="agree" name="agree" checked={form.agree} onChange={handle} className="a-checkbox" required />
                                <label htmlFor="agree" className="a-check-label">By using this form you agree with the storage and handling of your data by this website. <span>*</span></label>
                            </div>
                            <button type="submit" className="a-submit-btn">Submit</button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

// ── PAGE ROOT ───────────────────────────────────────────────
export default function AboutPage() {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div className="about-page">
            <Navbar />
            <AboutHero />
            <Vision />
            <CoreValues />
            <CommentForm />
            <Footer />
        </div>
    );
}