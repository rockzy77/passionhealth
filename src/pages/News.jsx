import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { getAllNews, getNews } from "../apis/news";
import { addSubscriber } from "../apis/subscribersapi";

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
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
);

// ── PAGE HERO ───────────────────────────────────────────────
const PageHero = () => (
    <section className="nw-hero">
        <div className="nw-hero-inner">
            <h1 className="nw-hero-title">Latest News &amp; Updates</h1>
            <p className="nw-hero-sub">Stay informed with the latest news, care tips, and updates from Passion Healthcare</p>
        </div>
    </section>
);


// ── NEWS GRID ───────────────────────────────────────────────
const NewsGrid = () => {

    async function getNewsFromBackend() {
        const news_t = await getAllNews();
        if (news_t.success) {
            setAllNews(news_t.news)
        }
        else {
            alert("Something went wrong")
        }
    }

    useEffect(() => {
        getNewsFromBackend();
    }, []);

    const [allNews, setAllNews] = useState([]);
    return (
        <section className="nw-news-section">
            {
                allNews.length !== 0 ? <div className="nw-news-grid">
                    {allNews.map((article) => {
                        // Generate excerpt from first paragraph of description
                        const excerpt = article.news_desc
                            .split('\n')
                            .map(l => l.trim())
                            .filter(l => l !== "" && !(l.startsWith('*') && l.endsWith('*') && l.length > 2))
                            .join(' ')
                            .substring(0, 150) + '...';
                        return (
                            <article key={article.news_id} className="nw-news-card">
                                <div className="nw-news-img-wrap">
                                    <img src={article.news_img} alt={article.news_title} className="nw-news-img" />
                                </div>
                                <div className="nw-news-content">
                                    <div className="nw-news-date">
                                        {new Date(article.news_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>                                <h2 className="nw-news-title">{article.news_title}</h2>
                                    <p className="nw-news-excerpt">{excerpt}</p>
                                    <a href={`/news/${article.news_id}`} className="nw-read-more">
                                        Read More <ArrowRightIcon />
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div> : <div>
                    <center>
                        <p>No news published...</p>
                    </center>
                </div>
            }
        </section>
    );
}

// ── NEWSLETTER SUBSCRIPTION ────────────────────────────────
const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const subscribeEmail = async () => {
        const res = await addSubscriber(email);
        if (res.success) {
            setSubscribed(true);
            setTimeout(() => {
                setEmail("");
                setSubscribed(false);
            }, 3000);
        }
        else {
            alert("Couldn't submit the form")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        subscribeEmail();
    };

    return (
        <section className="nw-newsletter">
            <div className="nw-newsletter-inner">
                <h2 className="nw-newsletter-title">Subscribe to Our Newsletter</h2>
                <p className="nw-newsletter-sub">Get the latest news, care tips, and updates delivered directly to your inbox</p>
                {subscribed ? (
                    <div className="nw-success-msg">✓ Thank you for subscribing!</div>
                ) : (
                    <div className="nw-newsletter-form">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="nw-newsletter-input"
                            required
                        />
                        <button onClick={subscribeEmail} className="nw-newsletter-btn">Subscribe</button>
                    </div>
                )}
            </div>
        </section>
    );
};


// ── PAGE ROOT ───────────────────────────────────────────────
export default function NewsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="nw-page">
            <Navbar />
            <PageHero />
            <NewsGrid />
            <Newsletter />
            <Footer />
        </div>
    );
}