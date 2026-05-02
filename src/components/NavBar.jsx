import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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

const MenuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const navLinks = [
    { to: "/",                label: "Home" },
    { to: "/about",           label: "About" },
    { to: "/our-care-givers", label: "Our Care Givers" },
    { to: "/specialist-care", label: "Specialist Care" },
    { to: "/services",        label: "Services" },
    { to: "/contact",         label: "Contact" },
    { to: "/news",            label: "News" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const handleNavClick = () => setMenuOpen(false);

    const handleRequestCare = () => {
        setMenuOpen(false);
        navigate('/contact', { state: { scrollToForm: true } });
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <div style={{
                    paddingTop: 10,
                    paddingBottom: 10
                }} className="nav-container">
                    <NavLink to="/" className="logo" onClick={handleNavClick}>
                        <img style={{ height: 60 }} src="/orglogo.png" alt="" />
                    </NavLink>

                    {/* Desktop links */}
                    <ul className="nav-links">
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={to === "/"}
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop right */}
                    <div className="nav-right">
                        <a href="tel:07738617000" className="nav-phone">
                            <PhoneIcon />
                            <span>07738617000</span>
                        </a>
                        <button className="btn-request-care" onClick={handleRequestCare}>
                            Request Care
                        </button>
                    </div>

                    {/* Hamburger — mobile only */}
                    <button
                        className="hamburger-btn"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""}`}>
                {/* Phone link at top */}
                <a href="tel:07738617000" className="mobile-phone" onClick={handleNavClick}>
                    <PhoneIcon />
                    <span>07738617000</span>
                </a>

                <ul className="mobile-nav-links">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={to === "/"}
                                className={({ isActive }) => isActive ? "mobile-link mobile-link--active" : "mobile-link"}
                                onClick={handleNavClick}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <button className="mobile-cta-btn" onClick={handleRequestCare}>
                    Request Care
                </button>
            </div>

            {/* Backdrop */}
            {menuOpen && (
                <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />
            )}

            <style>{`
                /* ── Hamburger button ──────────────────────── */
                .hamburger-btn {
                    display: none;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    background: transparent;
                    color: var(--navy);
                    border: 1.5px solid var(--border);
                    transition: background .2s, color .2s;
                    flex-shrink: 0;
                }
                .hamburger-btn:hover {
                    background: var(--teal-light);
                    color: var(--teal);
                    border-color: var(--teal);
                }

                /* ── Mobile drawer ─────────────────────────── */
                .mobile-drawer {
                    display: none;
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: #ffffff;
                    z-index: 99;
                    padding: 24px 24px 32px;
                    flex-direction: column;
                    gap: 8px;
                    transform: translateX(100%);
                    transition: transform .3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow-y: auto;
                }
                .mobile-drawer--open {
                    transform: translateX(0);
                }

                .mobile-backdrop {
                    display: none;
                    position: fixed;
                    inset: 0;
                    top: 70px;
                    background: rgba(0,0,0,0.35);
                    z-index: 98;
                    backdrop-filter: blur(2px);
                }

                .mobile-phone {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--navy);
                    padding: 14px 0;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 8px;
                }
                .mobile-phone svg {
                    color: var(--teal);
                }

                .mobile-nav-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    flex: 1;
                }

                .mobile-link {
                    display: block;
                    font-size: 16px;
                    font-weight: 500;
                    color: var(--text-body);
                    padding: 13px 12px;
                    border-radius: 8px;
                    transition: background .2s, color .2s;
                }
                .mobile-link:hover {
                    background: var(--teal-light);
                    color: var(--teal);
                }
                .mobile-link--active {
                    background: var(--teal-light);
                    color: var(--teal);
                    font-weight: 600;
                }

                .mobile-cta-btn {
                    margin-top: 16px;
                    width: 100%;
                    background: var(--teal);
                    color: white;
                    font-size: 15px;
                    font-weight: 600;
                    padding: 15px;
                    border-radius: 10px;
                    border: none;
                    transition: background .2s;
                    cursor: pointer;
                    font-family: 'Lato', sans-serif;
                }
                .mobile-cta-btn:hover {
                    background: var(--teal-dark);
                }

                /* ── Show on mobile ────────────────────────── */
                @media (max-width: 768px) {
                    .hamburger-btn {
                        display: flex;
                    }
                    .mobile-drawer {
                        display: flex;
                    }
                    .mobile-backdrop {
                        display: block;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;