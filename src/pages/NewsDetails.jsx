import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import the news articles array (will be replaced with API call)

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { getNews } from "../apis/news.js";
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
const ArrowLeftIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
);
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
);


// ── ARTICLE HERO ────────────────────────────────────────────
const ArticleHero = ({ article }) => (
    <section className="nd-hero">
        <div className="nd-hero-overlay"></div>
        <img src={article.news_img} alt={article.news_title} className="nd-hero-bg" />
        <div className="nd-hero-content">
            <h1 className="nd-hero-title">{article.news_title}</h1>
            <div className="nd-hero-date">{new Date(article.news_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
    </section>
);

const parseDescription = (description) => {
    const sections = [];
    const lines = description.split('\n');

    let currentSection = { title: null, content: [] };
    let pendingBlankLines = 0;

    lines.forEach((line) => {
        const trimmed = line.trim();

        if (trimmed === "") {
            // Count blank lines — will insert spacing before next content
            pendingBlankLines++;
            return;
        }

        if (trimmed.startsWith('*') && trimmed.endsWith('*') && trimmed.length > 2) {
            // Save current section before starting new heading
            if (currentSection.title !== null || currentSection.content.length > 0) {
                sections.push({ ...currentSection });
            }
            currentSection = { title: trimmed.slice(1, -1), content: [] };
            pendingBlankLines = 0;
        } else {
            // If there were blank lines before this line, insert empty entries as spacers
            if (pendingBlankLines > 0 && currentSection.content.length > 0) {
                for (let i = 0; i < pendingBlankLines; i++) {
                    currentSection.content.push(null); // null = blank line spacer
                }
            }
            pendingBlankLines = 0;
            currentSection.content.push(trimmed);
        }
    });

    if (currentSection.title !== null || currentSection.content.length > 0) {
        sections.push({ ...currentSection });
    }

    return sections;
};

const ArticleContent = ({ article, onBack }) => {
    const sections = parseDescription(article.news_desc);

    return (
        <section className="nd-article-section">
            <div className="nd-article-inner">
                <button onClick={onBack} className="nd-back-btn">
                    <ArrowLeftIcon /> Back to News
                </button>

                <article style={{ textAlign: 'justify' }} className="nd-article">
                    {sections.map((section, index) => (
                        <div key={index} className="nd-section">
                            {section.title && (
                                <h2 className="nd-section-title">{section.title}</h2>
                            )}
                            {section.content.map((line, pIndex) => (
                                <p key={pIndex} className="nd-paragraph">{line}</p>
                            ))}
                        </div>
                    ))}
                </article>
            </div>
        </section>
    );
};

// ── CTA SECTION ─────────────────────────────────────────────
const CTASection = () => (
    <section className="nd-cta">
        <div className="nd-cta-inner">
            <h2 className="nd-cta-title">Need Care Support?</h2>
            <p className="nd-cta-sub">
                If you'd like to discuss your care needs or have questions about our services, we're here to help.
            </p>
            <div className="nd-cta-actions">
                <a href="/contact" className="nd-cta-btn-primary">Contact Us Today</a>
                <a href="tel:07738617000" className="nd-cta-btn-outline">
                    <PhoneIcon /> 07738617000
                </a>
            </div>
        </div>
    </section>
);


// ── LOADING SPINNER ─────────────────────────────────────────
const LoadingSpinner = () => (
    <div className="nd-loading">
        <div className="nd-spinner"></div>
        <p>Loading article...</p>
    </div>
);

const NotFound = ({ onBack }) => (
    <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "60vh", textAlign: "center",
        padding: "40px 20px", fontFamily: "inherit"
    }}>
        <div style={{ fontSize: "80px", fontWeight: "800", color: "#e2e8f0", lineHeight: 1 }}>404</div>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a3c4e", margin: "16px 0 8px" }}>
            Article Not Found
        </h2>
        <p style={{ color: "#6b7280", fontSize: "15px", maxWidth: "360px", marginBottom: "28px" }}>
            The article you're looking for doesn't exist or may have been removed.
        </p>
        <button onClick={onBack} style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "12px 24px", background: "#0d6e6e", color: "#fff",
            border: "none", borderRadius: "8px", fontSize: "15px",
            fontWeight: "600", cursor: "pointer"
        }}>
            <ArrowLeftIcon /> Back to News
        </button>
    </div>
);

// ── PAGE ROOT ───────────────────────────────────────────────
export default function NewsDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const [loading, setLoading] = useState(true);

    const getNewsDB = async () => {
        const art = await getNews(id);
        if (art.success) {
            setArticle(art.news);
            setLoading(false);
        } else {
            setLoading(false);
            setNotFound(true);
        }
    };

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);


        getNewsDB();

    }, [id, navigate]);

    const handleBack = () => {
        navigate('/news');
    };

    if (loading) {
        return (
            <div className="nd-page">
                <Navbar />
                <LoadingSpinner />
            </div>
        );
    }

    // ← add this block
    if (notFound || !article) {
        return (
            <div className="nd-page">
                <Navbar />
                <NotFound onBack={() => navigate('/news')} />
                <Footer />
            </div>
        );
    }

    return (
        <div className="nd-page">
            <Navbar />
            <ArticleHero article={article} />
            <ArticleContent article={article} onBack={handleBack} />
            <CTASection />
            <Footer />
        </div>
    );
}