import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShieldIcon } from "./CustomIcons";

const CQCWidget = () => {
    useEffect(() => {
        const container = document.getElementById('cqc-widget-container');
        if (!container) return;
        if (container.querySelector('script')) return;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js?data-id=1-519858529&data-host=https://www.cqc.org.uk&type=location';
        container.appendChild(script);
    }, []);

    return <div id="cqc-widget-container" />;
};

const Footer = () => (
    <footer className="footer">
        <div className="accreditations">
            <h3>Accreditations</h3>
            <div className="accred-logos">

                <div className="accred-card" style={{ width: '100%' }}>
                    <CQCWidget />
                </div>

                <div className="accred-card">
                    <img
                        src="/alliancelogo.png"
                        alt="Leicestershire Homecare Alliance"
                        className="accred-img-1"
                    />
                </div>

                <div className="accred-card">
                    <a href="https://www.homecare.co.uk/homecare/agency.cfm/id/65432198945#reviews" target="_blank"> <img
                        src="/stamp.png"
                        alt="Recommended on homecare.co.uk"
                        className="accred-img-2"
                    /></a>
                </div>

            </div>
        </div>

        <div className="footer-bottom">
            <span>© 2026 Passion Healthcare. All rights reserved.</span>
            <div className="footer-links">
                <span className="footer-cqc"><ShieldIcon /> CQC Registered</span>
                <NavLink to={'/careers'}>Careers</NavLink>
            </div>
        </div>
    </footer>
);

export default Footer;
