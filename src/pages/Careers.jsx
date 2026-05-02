import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { sendCareerEmail } from "../apis/email"; // adjust path as needed

// ── SVG Icons ───────────────────────────────────────────────
const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
);
const UploadIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
);

const HandIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" width="32" height="32">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 30l-8-8 2.83-2.83L20 28.34l13.17-13.17L36 18l-16 16z" opacity="0.3" />
    </svg>
);
const TrainingIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" width="32" height="32">
        <path d="M24 6L4 18l8 4.36V32l12 6 12-6v-9.64l4-2.18V28h4V18L24 6z" opacity="0.3" />
    </svg>
);
const TeamIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" width="32" height="32">
        <path d="M32 22c2.21 0 3.98-1.79 3.98-4S34.21 14 32 14c-2.21 0-4 1.79-4 4s1.79 4 4 4zm-16 0c2.21 0 3.98-1.79 3.98-4S18.21 14 16 14c-2.21 0-4 1.79-4 4s1.79 4 4 4zm0 4c-2.67 0-8 1.34-8 4v4h16v-4c0-2.66-5.33-4-8-4zm16 0c-.29 0-.62.02-.97.05.02.01.05.02.07.02C32.45 26.56 36 28.32 36 30v4h8v-4c0-2.66-5.33-4-8-4z" opacity="0.3" />
    </svg>
);
const ClockIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" width="32" height="32">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" opacity="0.3" />
        <path d="M25 13h-2v12l10.5 6.3L35 29l-10-6z" />
    </svg>
);
const DollarIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" width="32" height="32">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm1.41 32.58V39h-2.82v-2.42c-2.34-.46-4.16-1.92-4.54-4.4l2.77-.55c.28 1.61 1.38 2.72 3.77 2.72 2.28 0 3.2-1.08 3.2-2.3 0-1.51-1.11-2.28-3.48-3.01-3.01-.93-5.27-2.23-5.27-5.01 0-2.39 1.8-4.26 4.54-4.79V17h2.82v2.24c2.21.42 3.69 1.85 4.05 4.08l-2.77.55c-.25-1.36-1.05-2.39-3.28-2.39-2.05 0-2.87.96-2.87 2.13 0 1.37.91 1.99 3.36 2.76 2.98.93 5.39 2.21 5.39 5.29 0 2.47-1.85 4.43-4.87 4.92z" opacity="0.3" />
    </svg>
);
const ShieldCheckIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" width="32" height="32">
        <path d="M24 4L8 10v10c0 9.93 6.87 19.21 16 21.48 9.13-2.27 16-11.55 16-21.48V10L24 4zm-4 28l-6-6 2.12-2.12L20 27.76l11.88-11.88L34 18l-14 14z" opacity="0.3" />
    </svg>
);
const GrowthIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" width="32" height="32">
        <path d="M36 28l-8-8-6 6-8-8-8 8 8 8 8-8 6 6 8-8z" opacity="0.3" />
    </svg>
);
const AwardIcon = () => (
    <svg viewBox="0 0 48 48" fill="currentColor" width="32" height="32">
        <path d="M24 4l-6 18H4l15 11-6 18 15-11 15 11-6-18 15-11H38z" opacity="0.3" />
    </svg>
);

// ── HERO SECTION ────────────────────────────────────────────
const Hero = () => (
    <section className="cr-hero">
        <div className="cr-hero-overlay"></div>
        <div className="cr-hero-content">
            <h1 className="cr-hero-title">Join Our Caring Team</h1>
            <p className="cr-hero-sub">
                Make a difference in people's lives. Build a rewarding career with Passion Healthcare.
            </p>
            <button
                className="cr-hero-btn"
                onClick={() => document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' })}
            >
                Apply Today
            </button>
        </div>
    </section>
);

// ── WHY WORK WITH US ────────────────────────────────────────
const benefits = [
    { icon: <HandIcon />, title: "Make a Difference", desc: "Help service users live better, more independent lives every single day" },
    { icon: <TrainingIcon />, title: "Continuous Training", desc: "Comprehensive training programs including specialist care and conditions" },
    { icon: <TeamIcon />, title: "Supportive Team", desc: "Work alongside experienced Seniors with nursing backgrounds who support you" },
    { icon: <ClockIcon />, title: "Flexible Hours", desc: "Various shift patterns available to suit your lifestyle and commitments" },
    { icon: <DollarIcon />, title: "Competitive Pay", desc: "Fair compensation with opportunities for advancement and pay increases" },
    { icon: <ShieldCheckIcon />, title: "Full Support", desc: "DBS checks covered, uniform provided, and ongoing professional support" },
    { icon: <GrowthIcon />, title: "Career Growth", desc: "Clear progression pathways from care assistant to senior roles" },
    { icon: <AwardIcon />, title: "Recognition", desc: "Your hard work and dedication are valued and celebrated" }
];

const WhyWorkWithUs = () => (
    <section className="cr-why">
        <div className="cr-why-inner">
            <h2 className="cr-why-title">Why Work With Us?</h2>
            <p className="cr-why-sub">We're extremely proud of all our staff and committed to supporting your growth</p>
            <div className="cr-benefits-grid">
                {benefits.map((benefit, i) => (
                    <div key={i} className="cr-benefit-card">
                        <div className="cr-benefit-icon">{benefit.icon}</div>
                        <h3 className="cr-benefit-title">{benefit.title}</h3>
                        <p className="cr-benefit-desc">{benefit.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ── APPLICATION FORM ────────────────────────────────────────
const ApplicationForm = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",   // ← fixed: was sharing phone's name/value
        resume: null
    });
    const [fileName, setFileName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handle = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm(f => ({ ...f, resume: file }));
            setFileName(file.name);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await sendCareerEmail(
            `${form.firstName} ${form.lastName}`,
            form.email,
            form.phone,
            form.address,
            form.resume
        );

        setLoading(false);

        if (result.success) {
            setSubmitted(true);
            setTimeout(() => {
                setForm({ firstName: "", lastName: "", email: "", phone: "", address: "", resume: null });
                setFileName("");
                setSubmitted(false);
            }, 4000);
        } else {
            setError("Something went wrong. Please try again or email us directly.");
        }
    };

    return (
        <section className="cr-apply" id="apply-form">
            <div className="cr-apply-inner">
                <h2 className="cr-apply-title">Apply Today</h2>
                <p className="cr-apply-sub">
                    Start your journey with Passion Healthcare. Fill out the form below and we'll be in touch.
                </p>

                {submitted ? (
                    <div className="cr-success">
                        <div className="cr-success-icon">✓</div>
                        <h3>Application Submitted!</h3>
                        <p>Thank you for your interest. We'll review your application and get back to you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={submit} className="cr-form">
                        <div className="cr-form-row">
                            <div className="cr-form-group">
                                <label className="cr-label">First Name <span>*</span></label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handle}
                                    className="cr-input"
                                    required
                                />
                            </div>
                            <div className="cr-form-group">
                                <label className="cr-label">Last Name <span>*</span></label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handle}
                                    className="cr-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="cr-form-group">
                            <label className="cr-label">Email Address <span>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handle}
                                className="cr-input"
                                required
                            />
                        </div>

                        <div className="cr-form-group">
                            <label className="cr-label">Phone Number <span>*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handle}
                                className="cr-input"
                                required
                            />
                        </div>

                        {/* ── Fixed: was using name="phone" and value={form.phone} ── */}
                        <div className="cr-form-group">
                            <label className="cr-label">Address <span>*</span></label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handle}
                                className="cr-input"
                                required
                            />
                        </div>

                        <div className="cr-form-group">
                            <label className="cr-label">Upload Your CV / Resume <span>*</span></label>
                            <div className="cr-file-upload">
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    onChange={handleFile}
                                    accept=".pdf,.doc,.docx"
                                    className="cr-file-input"
                                    required
                                />
                                <label htmlFor="resume" className="cr-file-label">
                                    <UploadIcon />
                                    {fileName || "Upload File"}
                                </label>
                            </div>
                            {fileName && <p className="cr-file-name">Selected: {fileName}</p>}
                        </div>

                        {error && <p className="cr-error">{error}</p>}

                        <button type="submit" className="cr-submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

// ── PAGE ROOT ───────────────────────────────────────────────
export default function CareersPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // ← added dependency array — was running on every render

    return (
        <div className="cr-page">
            <Navbar />
            <Hero />
            <WhyWorkWithUs />
            <ApplicationForm />
            <Footer />
        </div>
    );
}