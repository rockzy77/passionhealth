import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, ToastContainer } from "../../components/Toasts";
// Import news articles (will be replaced with API)
import { getAllNews, createNews, editNews, deleteNews } from "../../apis/news";
import { getAllSubscribers, removeSubscriber } from "../../apis/subscribersapi";
import { validateToken } from "../../apis/adminapi";

// ── SVG Icons ───────────────────────────────────────────────
const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);
const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
);
const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
);
const EditIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
);
const DeleteIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
);
const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);
const NewsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z" />
        <path d="M6 10h12v2H6zm0-3h12v2H6zm0 6h8v2H6z" />
    </svg>
);
const SubscriberIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
);
const UploadIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
);
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
);


export default function AdminDashboard() {
    const { toasts, showToast, removeToast } = useToast();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("news");
    const [authChecking, setAuthChecking] = useState(true);
    const [news, setNews] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [showNewsModal, setShowNewsModal] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newsForm, setNewsForm] = useState({
        title: "", date: "", img_url: "", description: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const getAllNewsFn = async () => {
        const t = await getAllNews();
        if (!t.success) showToast("Failed to load news articles", "error");
        else setNews(t.news);
    };

    const getAllSubscribersFn = async () => {
        const t = await getAllSubscribers();
        if (t.success) setSubscribers(t.subscribers);
        else showToast("Failed to load subscribers", "error");
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("adminToken");

            // No token at all — redirect immediately
            if (!token) {
                navigate("/admin");
                return;
            }

            const result = await validateToken();

            if (!result.success) {
                // Clean up whatever is stored
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");

                if (result.error === "EXPIRED") {
                    showToast("Your session has expired. Please log in again.", "warning");
                } else {
                    showToast("Invalid session. Please log in again.", "error");
                }

                // Small delay so toast is visible before redirect
                setTimeout(() => navigate("/admin"), 1500);
                return;
            }

            // Token is valid — load dashboard data
            setAuthChecking(false);
            getAllNewsFn();
            getAllSubscribersFn();
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin");
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) { alert("Please upload an image file"); return; }
        if (file.size > 5 * 1024 * 1024) { alert("Image size should be less than 5MB"); return; }
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
        if (!editingNews) setNewsForm({ ...newsForm, img_url: "" });
    };

    const openNewsModal = (article = null) => {
        if (article) {
            setEditingNews(article);
            setNewsForm({
                title: article.news_title,
                date: article.news_date,
                img_url: article.news_img,
                description: article.news_desc
            });
            setImagePreview(article.news_img);
        } else {
            setEditingNews(null);
            setNewsForm({ title: "", date: "", img_url: "", description: "" });
            setImagePreview("");
        }
        setImageFile(null);
        setShowNewsModal(true);
    };

    const closeNewsModal = () => {
        setShowNewsModal(false);
        setEditingNews(null);
        setNewsForm({ title: "", date: "", img_url: "", description: "" });
        setImageFile(null);
        setImagePreview("");
    };

    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", newsForm.title);
            formData.append("description", newsForm.description);
            if (imageFile) formData.append("image", imageFile);

            let result;
            if (editingNews) {
                result = await editNews(editingNews.news_id, formData);
            } else {
                if (!imageFile) {
                    showToast("Please upload a featured image", "warning");
                    setLoading(false);
                    return;
                }
                result = await createNews(formData);
            }

            if (result.success) {
                showToast(
                    editingNews ? "Article updated successfully!" : "Article created successfully!",
                    "success"
                );
                await getAllNewsFn();
                closeNewsModal();
            } else {
                showToast(result.message || "Something went wrong", "error");
            }
        } catch (err) {
            console.log(err);
            showToast("An unexpected error occurred", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteNews = async (id) => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;
        const result = await deleteNews(id);
        if (result.success) {
            setNews(news.filter(n => n.news_id !== id));
            showToast("Article deleted successfully!", "success");
        } else {
            showToast(result.message || "Failed to delete article", "error");
        }
    };

    const handleDeleteSubscriber = async (email) => {
        if (!window.confirm("Are you sure you want to remove this subscriber?")) return;
        const result = await removeSubscriber(email);
        if (result.success) {
            setSubscribers(prev => prev.filter(s => s.sb_email !== email));
            showToast("Subscriber removed successfully!", "success");
        } else {
            showToast(result.message || "Failed to remove subscriber", "error");
        }
    };

    if (authChecking) {
        return (
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "100vh", fontFamily: "inherit", color: "#6b7280", fontSize: "15px"
            }}>
                Verifying session...
            </div>
        );
    }
    else {
        return (
            <div className="ad-page">
                {/* Header */}
                <header className="ad-header">
                    <div className="ad-header-left">
                        <div className="ad-logo">
                            <div className="ad-logo-icon"><HeartIcon /></div>
                            <div className="ad-logo-text">
                                <span className="ad-logo-passion">Passion</span>
                                <span className="ad-logo-hc">Healthcare</span>
                            </div>
                        </div>
                        <h1 className="ad-header-title">Admin Dashboard</h1>
                    </div>
                    <button onClick={handleLogout} className="ad-logout-btn">
                        <LogoutIcon /> Logout
                    </button>
                </header>

                {/* Main Content */}
                <div className="ad-container">
                    {/* Tabs */}
                    <div className="ad-tabs">
                        <button
                            onClick={() => setActiveTab("news")}
                            className={`ad-tab ${activeTab === "news" ? "ad-tab-active" : ""}`}
                        >
                            <NewsIcon /> News Management
                        </button>
                        <button
                            onClick={() => setActiveTab("subscribers")}
                            className={`ad-tab ${activeTab === "subscribers" ? "ad-tab-active" : ""}`}
                        >
                            <SubscriberIcon /> Newsletter Subscribers
                        </button>
                    </div>

                    {/* News Management Tab */}
                    {activeTab === "news" && (
                        <div className="ad-content">
                            <div className="ad-content-header">
                                <h2 className="ad-content-title">News Articles</h2>
                                <button onClick={() => openNewsModal()} className="ad-btn-primary">
                                    <PlusIcon /> Create New Article
                                </button>
                            </div>

                            <div className="ad-table-wrapper">
                                <table className="ad-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {news.map((article, index) => (
                                            <tr key={article.news_id}>
                                                <td>{(index + 1)}</td>
                                                <td className="ad-table-title">{article.news_title}</td>
                                                <td>{new Date(article.news_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                                <td>
                                                    <div className="ad-action-btns">
                                                        <button
                                                            onClick={() => openNewsModal(article)}
                                                            className="ad-btn-edit"
                                                            title="Edit"
                                                        >
                                                            <EditIcon />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteNews(article.news_id)}
                                                            className="ad-btn-delete"
                                                            title="Delete"
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Subscribers Tab */}
                    {activeTab === "subscribers" && (
                        <div className="ad-content">
                            <div className="ad-content-header">
                                <h2 className="ad-content-title">Newsletter Subscribers ({subscribers.length})</h2>
                            </div>

                            <div className="ad-table-wrapper">
                                <table className="ad-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>Subscribed Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscribers.map((sub, index) => (
                                            <tr key={sub.sb_id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div className="ad-email">
                                                        <MailIcon /> {sub.sb_email}
                                                    </div>
                                                </td>
                                                <td>{new Date(sub.createdAt).toLocaleDateString('en-GB', {
                                                    day: 'numeric', month: 'long', year: 'numeric'
                                                })}</td>
                                                <td>
                                                    <div className="ad-action-btns">
                                                        <button
                                                            onClick={() => handleDeleteSubscriber(sub.sb_email)}  // ← email not id
                                                            className="ad-btn-delete"
                                                            title="Remove"
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* News Modal */}
                {showNewsModal && (
                    <div className="ad-modal-overlay" onClick={closeNewsModal}>
                        <div className="ad-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="ad-modal-header">
                                <h3 className="ad-modal-title">
                                    {editingNews ? "Edit Article" : "Create New Article"}
                                </h3>
                                <button onClick={closeNewsModal} className="ad-modal-close">×</button>
                            </div>

                            <form onSubmit={handleNewsSubmit} className="ad-modal-form">
                                <div className="ad-form-group">
                                    <label className="ad-label">Title *</label>
                                    <input
                                        type="text"
                                        value={newsForm.title}
                                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                                        className="ad-input"
                                        required
                                    />
                                </div>


                                <div className="ad-form-group">
                                    <label className="ad-label">Featured Image *</label>

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <div className="ad-image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                            <button type="button" onClick={removeImage} className="ad-remove-image">
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    )}

                                    {/* Upload Button */}
                                    {!imagePreview && (
                                        <div className="ad-upload-area">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="ad-file-input"
                                            />
                                            <label htmlFor="imageUpload" className="ad-upload-label">
                                                <UploadIcon />
                                                <span>Click to upload image</span>
                                                <span className="ad-upload-hint">PNG, JPG, WEBP (Max 5MB)</span>
                                            </label>
                                        </div>
                                    )}
                                </div>

                                <div className="ad-form-group">
                                    <label className="ad-label">
                                        Description *
                                        <span className="ad-hint"> (Press Enter for new lines, *text* for headings)</span>
                                    </label>
                                    <textarea
                                        value={newsForm.description}
                                        onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                                        className="ad-textarea"
                                        rows={12}
                                        placeholder={"*Heading*\n\nParagraph text..."}
                                        required
                                    />
                                </div>

                                <div className="ad-modal-actions">
                                    <button type="button" onClick={closeNewsModal} className="ad-btn-cancel">
                                        Cancel
                                    </button>
                                    <button type="submit" className="ad-btn-save">
                                        {editingNews ? "Update Article" : "Create Article"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <ToastContainer toasts={toasts} removeToast={removeToast} />
            </div>
        );
    }
}