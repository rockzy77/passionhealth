import React, { useState, useEffect } from "react";

export function useToast() {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success") => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3500);
    };

    const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

    return { toasts, showToast, removeToast };
}

export function ToastContainer({ toasts, removeToast }) {
    return (
        <div style={{
            position: "fixed", top: "20px", right: "20px",
            zIndex: 9999, display: "flex", flexDirection: "column", gap: "10px"
        }}>
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
        </div>
    );
}

function Toast({ toast, onRemove }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger slide-in
        requestAnimationFrame(() => setVisible(true));
    }, []);

    const configs = {
        success: {
            bg: "#f0fdf4", border: "#86efac", color: "#166534",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            )
        },
        error: {
            bg: "#fef2f2", border: "#fca5a5", color: "#991b1b",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            )
        },
        warning: {
            bg: "#fffbeb", border: "#fcd34d", color: "#92400e",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
            )
        }
    };

    const cfg = configs[toast.type] || configs.success;

    return (
        <div
            style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px 18px",
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderLeft: `4px solid ${cfg.border}`,
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                minWidth: "280px", maxWidth: "380px",
                color: cfg.color,
                fontFamily: "inherit", fontSize: "14px", fontWeight: "500",
                transform: visible ? "translateX(0)" : "translateX(120%)",
                opacity: visible ? 1 : 0,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                cursor: "pointer"
            }}
            onClick={() => onRemove(toast.id)}
        >
            <span style={{ flexShrink: 0, color: cfg.color }}>{cfg.icon}</span>
            <span style={{ flex: 1, lineHeight: "1.4" }}>{toast.message}</span>
            <span style={{ flexShrink: 0, opacity: 0.6, fontSize: "18px", lineHeight: 1 }}>×</span>
        </div>
    );
}