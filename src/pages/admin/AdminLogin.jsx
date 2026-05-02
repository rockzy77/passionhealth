import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../apis/adminapi";

// ── SVG Icons ───────────────────────────────────────────────
const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);
const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
);
const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);
const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
);
const EyeOffIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
);

export default function AdminLoginPage() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handle = (e) => {
        const { name, value } = e.target;
        setCredentials(c => ({ ...c, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // // Simulate API call
        // setTimeout(() => {
        //     // Replace this with actual API authentication
        //     if (credentials.username === "admin" && credentials.password === "admin123") {
        //         // Store auth token in localStorage
        //         localStorage.setItem("adminToken", "dummy-token-12345");
        //         localStorage.setItem("adminUser", credentials.username);
        //         navigate("/admin/dashboard");
        //     } else {
        //         setError("Invalid username or password");
        //         setLoading(false);
        //     }
        // }, 1000);


        try {
            const response = await adminLogin(credentials.username, credentials.password);
            console.log(response);
            if (response.success) {
                console.log("shj")
                localStorage.setItem('adminToken', response.token);
                navigate('/admin/dashboard');
            }
            else{
                console.log("hai")
                console.log(response.message)
                if(response.message === "Invalid credential"){
                    setError("Invalid username or password");
                    setLoading(false);
                }
            }


        } catch (err) {
            setError('Something Went Wrong');
            setLoading(false);
        }

    };

    return (
        <div className="adl-page">
            <div className="adl-container">
                <div className="adl-card">
                    <div className="adl-logo">
                        <div className="adl-logo-icon"><HeartIcon /></div>
                        <div className="adl-logo-text">
                            <span className="adl-logo-passion">Passion</span>
                            <span className="adl-logo-hc">Healthcare</span>
                        </div>
                    </div>

                    <div className="adl-header">
                        <div className="adl-lock-icon"><LockIcon /></div>
                        <h1 className="adl-title">Admin Login</h1>
                        <p className="adl-subtitle">Enter your credentials to access the admin panel</p>
                    </div>

                    <form onSubmit={handleSubmit} className="adl-form">
                        <div className="adl-form-group">
                            <label className="adl-label">Username</label>
                            <div className="adl-input-wrapper">
                                <UserIcon />
                                <input
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handle}
                                    placeholder="Enter your username"
                                    className="adl-input"
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="adl-form-group">
                            <label className="adl-label">Password</label>
                            <div className="adl-input-wrapper">
                                <LockIcon />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={credentials.password}
                                    onChange={handle}
                                    placeholder="Enter your password"
                                    className="adl-input"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="adl-toggle-password"
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>

                        {error && <div className="adl-error">{error}</div>}

                        <button type="submit" className="adl-submit" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="adl-footer">
                        <a href="/" className="adl-back-link">← Back to Website</a>
                    </div>
                </div>
            </div>
        </div>
    );
}