import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, HomeIcon, PersonalCareIcon, PhoneIcon, ShieldIcon, SpecialistIcon, StarIcon, UserIcon } from "../components/CustomIcons";


// ============== HERO ==============
const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="cqc-badge">
                        <ShieldIcon />
                        <span>CQC Registered Provider</span>
                    </div>

                    <h1 className="hero-title">
                        Passion 
                        Healthcare
                    </h1>

                    <p className="hero-subtitle">
                        Providing dignified, personalised care services since 2012
                    </p>

                    <div className="hero-actions">
                        <button onClick={() => navigate('/contact', { state: { scrollToForm: true } })} className="btn-primary">
                            Request Care Assessment <ArrowRightIcon />
                        </button>
                        <button onClick={() => window.location.href = 'tel:01162127942'} className="btn-outline-dark">
                            <PhoneIcon /> Call&nbsp; 0116 212 7942
                        </button>
                    </div>

                    <div className="hero-trust">
                        <div className="trust-item">
                            <div className="stars">
                                {[1, 2, 3, 4].map(i => <StarIcon key={i} filled={true} />)}
                                <StarIcon filled={false} />
                            </div>
                            <span>CQC Good Rating</span>
                        </div>
                        <div className="trust-divider">|</div>
                        <div className="trust-item">
                            <UserIcon />
                            <span>200+ Families Supported</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <div className="hero-image-bg"></div>
                    <img
                        src="/homecare1.png"
                        alt="Care giver with elderly patient"
                        className="hero-img"
                    />
                    <div className="care-badge-float">
                        <ClockIcon />
                        <div>
                            <div className="care-badge-title">24 / 7</div>
                            <div className="care-badge-sub">Care Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
                {[
                    { value: "12+", label: "Years Experienced" },
                    { value: "Good", label: "CQC Rating" },
                    { value: "200+", label: "Happy Clients" },
                    { value: "24/7", label: "Support Available" },
                ].map((s, i) => (
                    <div key={i} className="stat-item">
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    )
};

// ============== SERVICES ==============
const services = [
    {
        icon: <PersonalCareIcon />,
        iconBg: "icon-teal",
        title: "Personal Care",
        desc: "Compassionate assistance with daily living activities including bathing, dressing, grooming, and personal hygiene with dignity and respect.",
    },
    {
        icon: <SpecialistIcon />,
        iconBg: "icon-olive",
        title: "Specialist Support",
        desc: "Tailored care plans for individuals with dementia, learning disabilities, mental health conditions, and physical disabilities.",
    },
    {
        icon: <HomeIcon />,
        iconBg: "icon-teal-dark",
        title: "Live-In Care",
        desc: "Compassionate assistance with daily living activities including bathing, dressing, grooming, and personal hygiene with dignity and respect.",
    },
];

const Services = () => {

    const navigate = useNavigate();

    return (
        <section className="services">
            <div className="section-header">
                <h2 className="section-title">Our Care Services</h2>
                <p className="section-sub">Professional homecare tailored to your individual needs</p>
            </div>

            <div className="services-grid">
                {services.map((s, i) => (
                    <div className="service-card" key={i}>
                        <div className={`service-icon ${s.iconBg}`}>{s.icon}</div>
                        <h3 className="service-card-title">{s.title}</h3>
                        <p className="service-card-desc">{s.desc}</p>
                        <a href="#" className="learn-more">
                            Learn More <ArrowRightIcon />
                        </a>
                    </div>
                ))}
            </div>

            <div className="services-cta">
                <button onClick={() => navigate('/services')} className="btn-dark">
                    View All Services <ArrowRightIcon />
                </button>
            </div>
        </section>
    )
};

// ============== TESTIMONIALS ==============
const testimonials = [
    {
        text: "They're always happy to help in anyway they can. Always have a smile and most importantly, to me, encourage my Dad to do his exercises! Thank you!",
    },
    {
        text: "Fantastic service for my Mum. Caring, thoughtful, punctual and polite care. No task is to much. The Carers also add nice touches to visits, such as lovely prepared meals, fun, chatty and very pleasant.",
    },
    {
        text: "The teams that come to my house and care for me are excellent, very professional and very helpful, a great company.",
    },
];

const Testimonials = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        // Reinitialise Trustpilot widget on every mount
        if (window.Trustpilot) {
            const widget = document.querySelector('.trustpilot-widget');
            if (widget) {
                window.Trustpilot.loadFromElement(widget, true);
            }
        }
    }, [])

    const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
    const next = () => setActive((a) => (a + 1) % testimonials.length);

    return (
        <section className="testimonials">
            <div className="section-header">
                <h2 className="section-title dark">Trusted by Families Across Leicester</h2>
                <p className="section-sub dark-sub">What our clients say about us</p>
            </div>

            <div className="testimonial-card">
                <div className="quote-mark">"</div>
                <blockquote className="testimonial-text">
                    "{testimonials[active].text}"
                </blockquote>
            </div>

            <div className="testimonial-controls">
                <div className="dots">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === active ? "dot-active" : ""}`}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </div>
                <div className="arrows">
                    <button className="arrow-btn" onClick={prev}><ChevronLeftIcon /></button>
                    <button className="arrow-btn" onClick={next}><ChevronRightIcon /></button>
                </div>
            </div>
            <br />
            <br />
            <div class="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="69127171cf443adad4f25a75" data-style-height="52px" data-style-width="100%" data-token="6a3b981e-6606-4b78-ba6d-d4c6fbfe4886">
                <a href="https://www.trustpilot.com/review/passionhealthcare.co.uk" target="_blank" rel="noopener">Trustpilot</a>
            </div>
        </section>
    );
};

// ============== CTA ==============
const CTA = () => {

    const navigate = useNavigate();
    return (
        <section className="cta-section">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-sub">
                Contact us today for a free care assessment. Our friendly team is here<br />
                to answer your questions and help you find the right care solution.
            </p>

            <div className="cta-actions">
                <button onClick={() => navigate('/contact', { state: { scrollToForm: true } })} className="btn-cta-outline">
                    Request Free Assessment <ArrowRightIcon />
                </button>
                <button onClick={() => window.location.href = 'tel:01162127942'} className="btn-cta-outline">
                    <PhoneIcon /> Call&nbsp; 0116 212 7942
                </button>
            </div>

            <div className="cta-features">
                <div className="cta-feature">
                    <ClockIcon /> <span>24/7 Support</span>
                </div>
                <div className="cta-feature">
                    <ShieldIcon /> <span>CQC Registered</span>
                </div>
                <div className="cta-feature">
                    <UserIcon /> <span>Experienced Team</span>
                </div>
            </div>
        </section>
    )
};


// ============== APP ==============
export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className="app">
            <Navbar />
            <Hero />
            <Services />
            <Testimonials />
            
            <CTA />
            <Footer />
        </div>
    );
}