import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { sendContactForm } from "../apis/email";

import { useLocation } from "react-router-dom";



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
const PhoneLargeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
);
const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);
const LocationIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
);


// ── GET IN TOUCH SECTION ────────────────────────────────────
const GetInTouch = () => (
    <section className="ct-touch">
        <div className="ct-touch-inner">
            <div className="ct-touch-text">
                <h1 className="ct-touch-title">Get in Touch</h1>
                <p className="ct-touch-sub">
                    Contact us today to discuss your care needs. Our friendly team is here to help and answer any
                    questions you may have.
                </p>

                <div className="ct-contact-methods">
                    {/* Phone */}
                    <div className="ct-contact-item">
                        <div className="ct-contact-icon ct-icon-phone">
                            <PhoneLargeIcon />
                        </div>
                        <div className="ct-contact-info">
                            <div className="ct-contact-label">Phone</div>
                            <a href="tel:07738617000" className="ct-contact-value">07738617000</a>
                            <div className="ct-contact-note">24/7 Care Support Available</div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="ct-contact-item">
                        <div className="ct-contact-icon ct-icon-email">
                            <EmailIcon />
                        </div>
                        <div className="ct-contact-info">
                            <div className="ct-contact-label">Email</div>
                            <a href="mailto:info@passionhealthcare.co.uk" className="ct-contact-value">info@passionhealthcare.co.uk</a>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="ct-contact-item">
                        <div className="ct-contact-icon ct-icon-location">
                            <LocationIcon />
                        </div>
                        <div className="ct-contact-info">
                            <div className="ct-contact-label">Address</div>
                            <div className="ct-contact-value">Unit 10, Westleigh Business Park, Winchester Ave, Blaby</div>
                            <div className="ct-contact-note">Leicester LE8 4EZ, United Kingdom</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="ct-map-container">
                <div className="ct-map-embed">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.1234567890!2d-1.1658!3d52.5784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDM0JzQyLjIiTiAxwrAwOSc1Ni45Ilc!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Passion Healthcare Location"
                    ></iframe>
                </div>
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="ct-directions-btn">
                    Get Directions →
                </a>
            </div>
        </div>
    </section>
);

// ── CONTACT FORM ────────────────────────────────────────────
const ContactForm = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        reachMethod: "Phone",
        message: "",
        agree: false
    });
    const [submitted, setSubmitted] = useState(false);

    const handle = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        const res = await sendContactForm(form.firstName + " " + form.lastName, form.email, JSON.stringify(form));
        if (res.success) {
            setSubmitted(true);
        }
        else {
            alert("Couldn't sent message")
        }
    };

    return (
        <section id="ct-form-section" className="ct-form-section">
            <div className="ct-form-inner">
                <h2 className="ct-form-title">Contact Us</h2>
                <p className="ct-form-sub">
                    Contact us today to arrange free, no-obligation care consultation for you or your loved one.
                </p>
                <p className="ct-form-sub2">
                    Please fill out the form below. Our caring, capable, knowledgeable team are ready and willing to
                    answer any questions or concerns you may have and will get back to you shortly.
                </p>

                <div className="ct-form-card">
                    {submitted ? (
                        <div className="ct-success">
                            <div className="ct-success-icon">✓</div>
                            <h3>Thank you for contacting us!</h3>
                            <p>We've received your message and will get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="ct-form">
                            <div className="ct-form-row">
                                <div className="ct-form-group">
                                    <label className="ct-label">First Name <span>*</span></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handle}
                                        className="ct-input"
                                        required
                                    />
                                </div>
                                <div className="ct-form-group">
                                    <label className="ct-label">Last Name <span>*</span></label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handle}
                                        className="ct-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="ct-form-group">
                                <label className="ct-label">Email Address <span>*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handle}
                                    className="ct-input"
                                    required
                                />
                            </div>

                            <div className="ct-form-group">
                                <label className="ct-label">Phone Number <span>*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handle}
                                    className="ct-input"
                                    required
                                />
                            </div>

                            <div className="ct-form-group">
                                <label className="ct-label">Reach me through <span>*</span></label>
                                <select
                                    name="reachMethod"
                                    value={form.reachMethod}
                                    onChange={handle}
                                    className="ct-select"
                                    required
                                >
                                    <option value="Phone">Phone</option>
                                    <option value="Email">Email</option>
                                    <option value="Either">Either</option>
                                </select>
                            </div>

                            <div className="ct-form-group">
                                <label className="ct-label">Your Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handle}
                                    className="ct-textarea"
                                    rows={6}
                                    placeholder="Tell us about your care needs..."
                                />
                            </div>

                            <div className="ct-check-row">
                                <input
                                    type="checkbox"
                                    id="ct-agree"
                                    name="agree"
                                    checked={form.agree}
                                    onChange={handle}
                                    className="ct-checkbox"
                                    required
                                />
                                <label htmlFor="ct-agree" className="ct-check-label">
                                    By using this form you agree with the storage and handling of your data by this website. <span>*</span>
                                </label>
                            </div>

                            <button type="submit" className="ct-submit">Submit Application</button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

// ── PAGE ROOT ───────────────────────────────────────────────
export default function ContactPage() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        if (location.state?.scrollToForm) {
            setTimeout(() => {
                document.getElementById("ct-form-section")?.scrollIntoView({ behavior: "smooth" });
            }, 100); // small delay ensures the page has rendered
        }
    }, [location.state]);


    return (
        <div className="ct-page">
            <Navbar />
            <GetInTouch />
            <ContactForm />
            <Footer />
        </div>
    );
}