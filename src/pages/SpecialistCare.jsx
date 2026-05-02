import React, { useEffect, useState } from "react";
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
const ChevronUpIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
    </svg>
);

// Condition icons
const BrainIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M13 3C9.23 3 6.19 5.95 6 9.66l-1.92.39C2.88 10.38 2 11.5 2 12.81V14c0 1.1.9 2 2 2h1v-1.5c0-1.93 1.57-3.5 3.5-3.5 1.5 0 2.79.94 3.3 2.26.64-.16 1.3-.26 2.2-.26 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.69 0-1.33-.16-1.91-.44-.48.94-1.46 1.44-2.59 1.44-1.93 0-3.5-1.57-3.5-3.5V18H4c-1.1 0-2-.9-2-2v-1.19c0-1.31.88-2.43 2.08-2.76L6 11.66C6.19 7.95 9.23 5 13 5c3.87 0 7 3.13 7 7v.5h2V12c0-4.42-3.58-8-8-8z" />
    </svg>
);
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78z" />
    </svg>
);
const AccessibilityIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <circle cx="12" cy="4" r="2" /><path d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-2.54C8.24 6.99 6 4.75 6 2H4c0 3.16 2.11 5.84 5 6.71V22h2v-6h2v6h2V10.05L18.95 14l1.41-1.41-4.47-4.48z" />
    </svg>
);
const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
);
const MindIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" />
    </svg>
);
const PersonIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);
const LungsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8l-2.08-5.99zM18 20H6v-7.5l1.5-5h9l1.5 5V20zm-6-15h-1V3.5c0-.83-.67-1.5-1.5-1.5S8 2.67 8 3.5V5H7c-.55 0-1 .45-1 1s.45 1 1 1h1v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h1c.55 0 1-.45 1-1s-.45-1-1-1z" />
    </svg>
);
const TracheostomyIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
    </svg>
);
const OxygenIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
);
const CatheterIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
    </svg>
);
const NebuliserIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
);
const PegFeedingIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" />
    </svg>
);
const StomaIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </svg>
);


// ── HERO ────────────────────────────────────────────────────
const Hero = () => {

    const navigate = useNavigate();
    return (
        <section className="sc-hero">
            <div className="sc-hero-overlay"></div>
            <div className="sc-hero-content">
                <h1 className="sc-hero-title">Specialist Care</h1>
                <p className="sc-hero-sub">
                    Passion Healthcare have experience in managing many different health<br />
                    conditions and understand that the same condition does not affect everyone<br />
                    in the same way
                </p>
                <button onClick={() => navigate('/contact', { state: { scrollToForm: true } })} className="sc-hero-btn">
                    Discuss Your Needs <ArrowRightIcon />
                </button>
            </div>
        </section>
    )
};

// ── CONDITIONS ACCORDION ────────────────────────────────────
const conditions = [
    {
        icon: <BrainIcon />,
        title: "Alzheimer's/Dementia",
        subtitle: "Compassionate, person-centered care for individuals living with dimentia",
        description: "Passion Healthcare understands that dementia affects everyone differently. We provide specialized care that promotes dignity, independence, and quality of life, with regular reviews to adapt to changing needs.",
        iconBg: "#c7e6f0"
    },
    {
        icon: <ShieldIcon />,
        title: "Multiple Sclerosis",
        subtitle: "Tailored care for individuals living with MS",
        description: "We understand that MS affects each person differently. Our care plans are regularly reviewed and updated to accommodate the changing nature of this condition.",
        iconBg: "#d4f0db"
    },
    {
        icon: <BrainIcon />,
        title: "Parkinson's Disease",
        subtitle: "Specialized support for managing Parkinson's symptoms",
        description: "Our experienced caregivers are trained in managing the unique challenges of Parkinson's disease, providing support that adapts as the condition changes over time.",
        iconBg: "#cfe5f5"
    },
    {
        icon: <AccessibilityIcon />,
        title: "Physical Disabilities",
        subtitle: "Specialized care supporting mobility and independence",
        description: "Expert care for individuals with physical disabilities, focusing on maximizing independence and quality of life with properly trained caregivers.",
        iconBg: "#d8e8f0"
    },
    {
        icon: <EyeIcon />,
        title: "Sensory Impairment",
        subtitle: "Adapted care for visual and hearing impairments",
        description: "Our caregivers use appropriate communication methods and environmental adaptations to ensure safety, independence, and quality of life for those with sensory impairments.",
        iconBg: "#c7e6f0"
    },
    {
        icon: <MindIcon />,
        title: "Mental Health Conditions",
        subtitle: "Understanding care for individuals with mental health needs",
        description: "Compassionate support for individuals experiencing mental health challenges, working collaboratively to ensure holistic, recovery-focused care.",
        iconBg: "#e8f0d4"
    },
    {
        icon: <PersonIcon />,
        title: "Learning Disabilities",
        subtitle: "Personalized support promoting independence and inclusion",
        description: "Tailored support focusing on promoting independence, developing life skills, and enabling full participation in community life.",
        iconBg: "#dde8f5"
    },
    {
        icon: <LungsIcon />,
        title: "Cough Assist Treatment",
        subtitle: "Specialized respiratory support and assistance",
        description: "Our trained caregivers provide expert assistance with cough assist devices to support respiratory health and comfort.",
        iconBg: "#d8ebf0"
    },
    {
        icon: <TracheostomyIcon />,
        title: "Tracheostomy Care",
        subtitle: "Expert tracheostomy management and support",
        description: "Specialized care for individuals with tracheostomies, ensuring proper maintenance, safety, and comfort with highly trained staff.",
        iconBg: "#c7e6f0"
    },
    {
        icon: <OxygenIcon />,
        title: "Oxygen Therapy",
        subtitle: "Professional oxygen therapy management",
        description: "Safe and effective oxygen therapy support, with caregivers trained in proper equipment use and monitoring.",
        iconBg: "#d4eef5"
    },
    {
        icon: <CatheterIcon />,
        title: "Catheter Care",
        subtitle: "Dignified and professional catheter management",
        description: "Compassionate catheter care provided with dignity and respect, ensuring comfort and preventing complications.",
        iconBg: "#d8e8f0"
    },
    {
        icon: <NebuliserIcon />,
        title: "Nebulisers",
        subtitle: "Respiratory medication administration support",
        description: "Expert assistance with nebuliser treatments to manage respiratory conditions effectively and safely.",
        iconBg: "#cfe5f5"
    },
    {
        icon: <PegFeedingIcon />,
        title: "PEG Feeding",
        subtitle: "Specialized nutritional support via PEG tube",
        description: "Trained caregivers provide safe and effective PEG feeding support, ensuring proper nutrition and tube maintenance.",
        iconBg: "#d4f0db"
    },
    {
        icon: <StomaIcon />,
        title: "Stoma Care",
        subtitle: "Professional stoma management and support",
        description: "Dignified stoma care provided by trained professionals, ensuring comfort, hygiene, and confidence.",
        iconBg: "#e8f0d4"
    },
];

const ConditionsAccordion = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className="sc-conditions">
            <div className="sc-conditions-inner">
                <h2 className="sc-conditions-title">Conditions We Treat</h2>
                <p className="sc-conditions-sub">
                    Chronic or long-term conditions can change over time and require regular reviews and updates to the care plan.
                    We work with you to build a care plan that accommodates your specific needs and goals for the future.
                </p>

                <div className="sc-accordion">
                    {conditions.map((c, i) => {
                        const isOpen = openIndex === i;
                        const isHighlighted = i === 4 || i === 8; // Sensory Impairment, Tracheostomy Care

                        return (
                            <div key={i} className={`sc-accordion-item ${isOpen ? "sc-open" : ""} ${isHighlighted ? "sc-highlighted" : ""}`}>
                                <div className="sc-accordion-header" onClick={() => toggle(i)}>
                                    <div className="sc-accordion-left">
                                        <div className="sc-accordion-icon" style={{ background: c.iconBg }}>
                                            {c.icon}
                                        </div>
                                        <div>
                                            <div className="sc-accordion-title">{c.title}</div>
                                            <div className="sc-accordion-subtitle">{c.subtitle}</div>
                                        </div>
                                    </div>
                                    <button className={`sc-accordion-toggle ${isOpen ? "sc-rotated" : ""}`}>
                                        <ChevronUpIcon />
                                    </button>
                                </div>

                                {isOpen && (
                                    <div className="sc-accordion-body">
                                        <p>{c.description}</p>
                                        <Link
                                            to="/contact"
                                            state={{ scrollToForm: true }}
                                            className="sc-request-link"
                                        >
                                        Request This Care <ArrowRightIcon />
                                    </Link>
                                    </div>
                        )
                    }
                            </div>
                );
                    })}
            </div>
        </div>
        </section >
    );
};

// ── PAGE ROOT ───────────────────────────────────────────────
export default function SpecialistCarePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className="sc-page">
            <Navbar />
            <Hero />
            <ConditionsAccordion />
            <Footer />
        </div>
    );
}