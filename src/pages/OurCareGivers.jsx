import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);
const CloudIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
);
const HeartOutlineIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);
const CareIcon = () => (
    <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
        <path d="M20 28l-1.2-1.1C13.2 22.2 10 19.5 10 16.2 10 13.5 12.2 11.3 15 11.3c1.5 0 2.9.7 3.9 1.8.9-1.1 2.4-1.8 3.9-1.8 2.8 0 5 2.2 5 4.9 0 3.3-3.2 6-8.8 10.7z" fill="currentColor" />
        <path d="M10 20h4l2-3.5L18 24l2-5 1.5 1H26" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
);

// ── Team Special Icons ───────────────────────────────────────
const VettedIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
);
const TrainedIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
);
const DedicatedIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
);
const NursingIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
    </svg>
);

// ── PAGE HERO ───────────────────────────────────────────────
const PageHero = () => (
    <section className="cg-hero">
        <div className="cg-hero-inner">
            <div className="cg-breadcrumb">
                <a href="#">Home</a><span>/</span><span>Our Care Givers</span>
            </div>
            <h1 className="cg-hero-title">Our Care Givers</h1>
            <p className="cg-hero-sub">
                Passion Healthcare acknowledges it is nothing without our amazing team of carers who<br />
                are out caring for our service users 365 days of the year whatever the weather.
            </p>
            <p className="cg-hero-sub2">We are extremely proud of all of our staff.</p>
        </div>
    </section>
);

const ExperiencedSeniors = () => (
    <section className="cg-seniors">
        <div className="cg-seniors-inner">
            <div className="cg-seniors-img-wrap">
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&q=80" alt="Care team with patient" className="cg-seniors-img" />
            </div>
            <div className="cg-seniors-text">
                <h2 className="cg-seniors-title">Led by Experienced Seniors</h2>
                <p>Our care staff are led by a team of Seniors who all have extensive experience in care giving and in most cases have a nursing background.</p>
                <p>Our Seniors are always on hand to help the rest of the team and to support our Service Users with any issues they may have.</p>
                <p>Our highly skilled and trained caregivers provide companion care to our service users with a variety of daily activities.</p>
            </div>
        </div>
    </section>
);

const BuildingTrust = () => (
    <section className="cg-trust">
        <div className="cg-trust-inner">
            <div className="cg-trust-text">
                <h2 className="cg-trust-title">Building Trust &amp;<br />Relationships</h2>
                <p>We understand that trust is important, especially when allowing a stranger access to your home.</p>
                <p>Our staff are thoroughly vetted prior to employment and are comprehensively trained before visiting our valued service users.</p>
                <blockquote className="cg-blockquote">
                    <em>"By receiving care from your own dedicated team, you can get to know and trust your carers. Many of our service users describe their carers as being like family to them."</em>
                </blockquote>
            </div>
            <div className="cg-trust-img-wrap">
                <img src="/homecare4.png" alt="Two elderly women laughing together" className="cg-trust-img" />
            </div>
        </div>
    </section>
);

// ── WHAT MAKES TEAM SPECIAL ────────────────────────────────
const teamFeatures = [
    { icon: <VettedIcon />,    title: "Thoroughly Vetted",    desc: "All staff are comprehensively vetted prior to employment with enhanced DBS checks" },
    { icon: <TrainedIcon />,   title: "Extensively Trained",  desc: "Mandatory training plus specialized courses in specific conditions and care techniques" },
    { icon: <DedicatedIcon />, title: "Dedicated Teams",      desc: "Your own dedicated care team so you can build trust and lasting relationships" },
    { icon: <NursingIcon />,   title: "Nursing Background",   desc: "Led by experienced seniors with nursing backgrounds who support the entire team" },
];

const TeamSpecial = () => (
    <section className="cg-special">
        <div className="cg-special-inner">
            <h2 className="cg-special-title">What Makes Our Team Special</h2>
            <p className="cg-special-sub">All of our staff are kind and caring and are willing to go the extra mile to help our service users.</p>
            <div className="cg-special-grid">
                {teamFeatures.map((f, i) => (
                    <div className="cg-special-card" key={i}>
                        <div className="cg-special-avatar">{f.icon}</div>
                        <h3 className="cg-special-card-title">{f.title}</h3>
                        <p className="cg-special-card-desc">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ── Knowledge Icons ─────────────────────────────────────────
const BrainIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
    </svg>
);
const PersonCentreIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
    </svg>
);
const DementiaIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 13.05 9.5 15.2 9.5c1.85 0 3.52-.66 4.84-1.74.6 1.18.96 2.52.96 3.95 0 4.42-3.59 8.29-9 8.29z" opacity=".3"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 13.05 9.5 15.2 9.5c1.85 0 3.52-.66 4.84-1.74.6 1.18.96 2.52.96 3.95 0 4.42-3.59 8 9 8z"/>
    </svg>
);
const ParkinsonsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
    </svg>
);
const MSIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
);
const LearningIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
);
const PEGIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
    </svg>
);
const CatheterIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3-8H9V6h6v2z"/>
    </svg>
);

const knowledgeItems = [
    { label: "Challenging Behaviour", icon: <BrainIcon /> },
    { label: "Person Centred Care",   icon: <PersonCentreIcon /> },
    { label: "Dementia Care",         icon: <DementiaIcon /> },
    { label: "Parkinson's Disease",  icon: <ParkinsonsIcon /> },
    { label: "Multiple Sclerosis",    icon: <MSIcon /> },
    { label: "Learning Disabilities", icon: <LearningIcon /> },
    { label: "PEG Feeding",           icon: <PEGIcon /> },
    { label: "Catheter Care",         icon: <CatheterIcon /> },
];

const KnowledgeKey = () => (
    <section className="cg-knowledge">
        <div className="cg-knowledge-inner">
            <h2 className="cg-knowledge-title">Knowledge is Key</h2>
            <p className="cg-knowledge-sub">At Passion Healthcare we believe that knowledge is key. Our staff undertake mandatory training as well as specialized courses to ensure the highest quality of care.</p>
            <div className="cg-knowledge-grid">
                {knowledgeItems.map((item, i) => (
                    <div className="cg-knowledge-item" key={i}>
                        <div className="cg-k-icon">{item.icon}</div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="cg-knowledge-note">
                Our training includes specialized care techniques such as <strong>PEG feeding</strong>, <strong>Catheter Care</strong>, and many more specialized procedures.
            </div>
        </div>
    </section>
);

const yearFeatures = [
    { icon: <CalendarIcon />, title: "Every Single Day",       desc: "No holidays, no breaks – we're always here when you need us" },
    { icon: <CloudIcon />,    title: "All Weather Conditions", desc: "Rain, snow, or shine – our commitment never wavers" },
    { icon: <HeartOutlineIcon />, title: "Unwavering Dedication", desc: "Going the extra mile for every service user, every day" },
];

const YearRound = () => (
    <section className="cg-year">
        <div className="cg-year-inner">
            <div className="cg-year-img-wrap">
                <img src="/homecare5.png" alt="Carers in winter weather" className="cg-year-img" />
            </div>
            <div className="cg-year-text">
                <h2 className="cg-year-title">365 Days a Year</h2>
                <p className="cg-year-sub">Our amazing team of carers are out caring for our service users 365 days of the year, whatever the weather.</p>
                <div className="cg-year-features">
                    {yearFeatures.map((f, i) => (
                        <div className="cg-year-feature" key={i}>
                            <div className="cg-year-feature-icon">{f.icon}</div>
                            <div>
                                <div className="cg-year-feature-title">{f.title}</div>
                                <div className="cg-year-feature-desc">{f.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// const CommentForm = () => {
//     const [form, setForm] = useState({ name: "", email: "", comment: "", saveInfo: false, agree: false });
//     const [submitted, setSubmitted] = useState(false);
//     const handle = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
//     };
//     const submit = (e) => { e.preventDefault(); setSubmitted(true); };

//     return (
//         <section className="cg-comment">
//             <div className="cg-comment-inner">
//                 <h2 className="cg-comment-title">Leave a Comment</h2>
//                 <p className="cg-comment-sub">We'd love to hear your thoughts about our services.</p>
//                 <div className="cg-form-card">
//                     {submitted ? (
//                         <div className="cg-success">
//                             <div className="cg-success-icon">✓</div>
//                             <h3>Thank you for your comment!</h3>
//                             <p>We'll get back to you as soon as possible.</p>
//                         </div>
//                     ) : (
//                         <form onSubmit={submit} className="cg-form">
//                             <div className="cg-form-row">
//                                 <div className="cg-form-group">
//                                     <label className="cg-label">Full Name <span>*</span></label>
//                                     <input type="text" name="name" value={form.name} onChange={handle} placeholder="Enter your full name" className="cg-input" required />
//                                 </div>
//                                 <div className="cg-form-group">
//                                     <label className="cg-label">Email Address <span>*</span></label>
//                                     <input type="email" name="email" value={form.email} onChange={handle} placeholder="Enter your email address" className="cg-input" required />
//                                 </div>
//                             </div>
//                             <div className="cg-check-row">
//                                 <input type="checkbox" id="cg-save" name="saveInfo" checked={form.saveInfo} onChange={handle} className="cg-checkbox" />
//                                 <label htmlFor="cg-save" className="cg-check-label">Save my name and email for next time.</label>
//                             </div>
//                             <div className="cg-form-group">
//                                 <label className="cg-label">Your Comment <span>*</span></label>
//                                 <textarea name="comment" value={form.comment} onChange={handle} placeholder="Share your thoughts..." className="cg-textarea" rows={7} required />
//                             </div>
//                             <div className="cg-check-row">
//                                 <input type="checkbox" id="cg-agree" name="agree" checked={form.agree} onChange={handle} className="cg-checkbox" required />
//                                 <label htmlFor="cg-agree" className="cg-check-label">By using this form you agree with the storage and handling of your data. <span>*</span></label>
//                             </div>
//                             <button type="submit" className="cg-submit">Submit</button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };

export default function CareGiversPage() {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <div className="cg-page">
            <Navbar />
            <PageHero />
            <ExperiencedSeniors />
            <BuildingTrust />
            <TeamSpecial />
            <KnowledgeKey />
            <YearRound />
            {/* <CommentForm /> */}
            <Footer />
        </div>
    );
}