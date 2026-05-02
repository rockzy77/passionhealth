import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

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
const ArrowRightIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
);

// Service card icons
const HeartPulseIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path d="M3 12h3l2-4 2 8 2-5 1.5 1H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" fill="none" />
    </svg>
);
const MealIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
    </svg>
);
const MedicationIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M4.22 11.29l2.36-2.36c.39-.39 1.02-.39 1.41 0L9.17 10.1l1.42-1.41-1.42-1.42c-.39-.39-.39-1.02 0-1.41l2.36-2.36c.39-.39 1.02-.39 1.41 0l6.36 6.36c.39.39.39 1.02 0 1.41L16.94 14l-1.42-1.42 1.42-1.42-4.24-4.24-.71.71 4.24 4.24-6.36 6.36c-.39.39-1.02.39-1.41 0L4.22 14c-.39-.39-.39-1.02 0-1.41l.71-.71-1.42-1.42-.71.71z" />
        <path d="M15 13h-2v-2h-2v2H9v2h2v2h2v-2h2z" />
    </svg>
);
const ShoppingBagIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
    </svg>
);
const CompanionIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
);
const BedIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6h2v-2h16v2h2v-6c0-.88-.39-1.67-1-2.22zM14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1zM5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5V8zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2H4z" />
    </svg>
);

// How We Work step icons
const ChatIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
);
const ClipboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h2v3h10V5h2v14z" />
    </svg>
);
const TeamIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
);
const PackageIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-9l1.96 2.5H17V9h2.5zm-1.5 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
);

// Household icons
const LaundryIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M9.17 16.83c1.56 1.56 4.1 1.56 5.66 0 1.56-1.56 1.56-4.1 0-5.66l-5.66 5.66zM18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-1.99-2-1.99zM10 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
    </svg>
);
const DishIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 10v-2h4v2h-4zm0-4v-2h4v2h-4zm0-4V7h4v2h-4zM20 19h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2z" />
    </svg>
);
const HomeCleanIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
);
const IndependenceIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
);


// ── PAGE HERO ───────────────────────────────────────────────
const PageHero = () => (
    <section className="sv-hero">
        <div className="sv-hero-inner">
            <div className="sv-breadcrumb">
                <a href="#">Home</a><span>/</span><span>Services</span>
            </div>
            <h1 className="sv-hero-title">Services</h1>
            <p className="sv-hero-text">
                At some point in life whether after or during illness or due to advancement in age all of us
                experience times where we find it difficult to manage basic day to day routines.
            </p>
            <p className="sv-hero-text2">
                <strong>Passion Healthcare</strong> are here to help! We can take on the tasks that you are struggling to
                manage or simply assist you to manage them yourself.
            </p>
        </div>
    </section>
);

// ── SERVICE CARDS ───────────────────────────────────────────
const services = [
    {
        icon: <HeartPulseIcon />,
        iconBg: "#3d7f8a",
        title: "Personal Care and Assistance",
        desc: "Personal care, bathing/showering, incontinence care, grooming, dressing, transfers etc.",
        bullets: [
            "Getting in and out of bed",
            "Washing/showering/bathing and dressing",
            "Daily grooming",
            "Toileting and incontinence care",
            "Personal transfers and mobility support"
        ]
    },
    {
        icon: <MealIcon />,
        iconBg: "#3d7f8a",
        title: "Meal Preparation and Assistance",
        desc: "Meal preparation (with dietary restrictions), feeding, etc.",
        bullets: [
            "Preparing meals and drinks",
            "Assistance with eating and feeding",
            "Special dietary requirements",
            "Menu planning and shopping",
            "Kitchen cleaning and hygiene"
        ]
    },
    {
        icon: <MedicationIcon />,
        iconBg: "#2a7f8a",
        title: "Professional Medication Management",
        desc: "Reminders, supervision, administration of medication, ordering and collection of medication etc.",
        bullets: [
            "Medication reminders",
            "Supervision of medication taking",
            "Administering medication",
            "Ordering and collection of medication",
            "Liaison with healthcare professionals"
        ]
    },
    {
        icon: <ShoppingBagIcon />,
        iconBg: "#3d7f8a",
        title: "Shopping and Holiday/Hospital Escorts",
        desc: "Assistance with shopping, hospital visits or even on holiday.",
        bullets: [
            "Assistance with shopping",
            "Hospital visit accompaniment",
            "Holiday escort services",
            "Medical appointment support",
            "Transport assistance"
        ]
    },
    {
        icon: <CompanionIcon />,
        iconBg: "#3a6d80",
        title: "Companionship and Recreation",
        desc: "Conversation and entertainment (assistance with reading, games, crafts, puzzles, etc.)",
        bullets: [
            "Friendly conversation and social interaction",
            "Assistance with reading",
            "Games and puzzles",
            "Arts and crafts activities",
            "Entertainment and hobby support"
        ]
    },
    {
        icon: <BedIcon />,
        iconBg: "#2a7f8a",
        title: "Waking/Sleeping Nights/24 Hour Care/Live In Care",
        desc: "All aspects of daily living.",
        bullets: [
            "Waking night care",
            "Sleeping night support",
            "24-hour comprehensive care",
            "Live-in care services",
            "All aspects of daily living support"
        ]
    },
];

const ServiceCards = () => (
    <section className="sv-services">
        <div className="sv-services-grid">
            {services.map((s, i) => (
                <div className="sv-service-card" key={i}>
                    <div className="sv-service-icon" style={{ background: s.iconBg }}>
                        {s.icon}
                    </div>
                    <h3 className="sv-service-title">{s.title}</h3>
                    <p className="sv-service-desc">{s.desc}</p>
                    <ul className="sv-service-list">
                        {s.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                        ))}
                    </ul>
                    <Link
                        to="/contact"
                        state={{ scrollToForm: true }}
                        className="sc-request-link"
                    >
                        Request This Care <ArrowRightIcon />
                    </Link>
                </div>
            ))}
        </div>
    </section>
);

// ── HOW WE WORK ─────────────────────────────────────────────
const steps = [
    {
        num: "1",
        icon: <ChatIcon />,
        title: "Initial Visit & Assessment",
        desc: "All staff are comprehensively vetted prior to employment with enhanced DBS checks"
    },
    {
        num: "2",
        icon: <ClipboardIcon />,
        title: "Comprehensive Care Plan",
        desc: "Mandatory training plus specialized courses in specific conditions and care techniques"
    },
    {
        num: "3",
        icon: <TeamIcon />,
        title: "Dedicated Care Team",
        desc: "Your own dedicated care team so you can build trust and lasting relationships"
    },
    {
        num: "4",
        icon: <PackageIcon />,
        title: "Tailored Care Package",
        desc: "Led by experienced seniors with nursing backgrounds who support the entire team"
    },
];

const HowWeWork = () => (
    <section className="sv-how">
        <div className="sv-how-inner">
            <h2 className="sv-how-title">How We Work</h2>
            <p className="sv-how-sub">
                Passion Healthcare's management team will visit you to discuss your needs and goals, complete an
                assessment and create a comprehensive, personalised care plan
            </p>
            <div className="sv-how-grid">
                {steps.map((st, i) => (
                    <div className="sv-how-card" key={i}>
                        <div className="sv-how-number">{st.num}</div>
                        <div className="sv-how-icon">{st.icon}</div>
                        <h3 className="sv-how-card-title">{st.title}</h3>
                        <p className="sv-how-card-desc">{st.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ── HOUSEHOLD SUPPORT ───────────────────────────────────────
const Household = () => (
    <section className="sv-household">
        <div className="sv-household-inner">
            <div className="sv-household-text">
                <h2 className="sv-household-title">Household<br />Support Services</h2>
                <p className="sv-household-sub">
                    Beyond personal care, we can help with household tasks that you're finding difficult to manage,
                    ensuring your home remains comfortable and well-maintained.
                </p>
                <div className="sv-household-list">
                    <div className="sv-household-item">
                        <div className="sv-household-item-icon" style={{ background: "#3d7f8a" }}>
                            <LaundryIcon />
                        </div>
                        <div>
                            <div className="sv-household-item-title">Laundry Services</div>
                            <div className="sv-household-item-desc">Washing, drying, and organizing your clothing and linens</div>
                        </div>
                    </div>
                    <div className="sv-household-item">
                        <div className="sv-household-item-icon" style={{ background: "#3a6d80" }}>
                            <DishIcon />
                        </div>
                        <div>
                            <div className="sv-household-item-title">Washing Up</div>
                            <div className="sv-household-item-desc">Kitchen cleaning and dishwashing support</div>
                        </div>
                    </div>
                    <div className="sv-household-item">
                        <div className="sv-household-item-icon" style={{ background: "#2a7f8a" }}>
                            <HomeCleanIcon />
                        </div>
                        <div>
                            <div className="sv-household-item-title">General Housekeeping</div>
                            <div className="sv-household-item-desc">Light cleaning and maintaining a tidy living space</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sv-household-img-wrap">
                <img
                    src="/homecare6.png"
                    alt="Caregiver assisting elderly woman"
                    className="sv-household-img"
                />
                <div className="sv-household-badge">
                    <IndependenceIcon />
                    <div>
                        <div className="sv-badge-label">Maintaining</div>
                        <div className="sv-badge-text">Your Independence</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// ── SPECIALIST CTA ──────────────────────────────────────────
const SpecialistCTA = () => {

    const navigate = useNavigate();

    return (
        <section className="sv-specialist-cta">
            <div className="sv-specialist-inner">
                <h2 className="sv-specialist-title">Need Specialist Care?</h2>
                <p className="sv-specialist-sub">
                    We also provide tailored care for people with dementia, learning disabilities,<br />
                    mental health conditions, and more.
                </p>
                <button onClick={() => navigate('/specialist-care')} className="sv-specialist-btn">
                    Explore Specialist Care <ArrowRightIcon />
                </button>
            </div>
        </section>
    )
};

// ── PAGE ROOT ───────────────────────────────────────────────
export default function ServicesPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className="sv-page">
            <Navbar />
            <PageHero />
            <ServiceCards />
            <HowWeWork />
            <Household />
            <SpecialistCTA />
            <Footer />
        </div>
    );
}