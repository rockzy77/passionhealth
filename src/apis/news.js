import axios from 'axios';

axios.defaults.withCredentials = true;

const server_url = "https://api.passionhealthcare.co.uk/";

// ── Get all news ──────────────────────────────────────────────
export const getAllNews = async () => {
    try {
        const res = await axios.get(server_url + "getAllNews");
        return res.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

// ── Get single news by ID ─────────────────────────────────────
export const getNews = async (news_id) => {
    try {
        const res = await axios.get(server_url + "getNewsById/" + news_id);
        return res.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

// ── Create news (FormData for image upload) ───────────────────
export const createNews = async (formData) => {   // ← renamed param, no collision
    try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.post(server_url + "createNews", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

// ── Edit news (image optional) ────────────────────────────────
export const editNews = async (news_id, formData) => {
    try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.put(server_url + "editNews/" + news_id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

// ── Delete news ───────────────────────────────────────────────
export const deleteNews = async (news_id) => {
    try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.delete(server_url + "deleteNews/" + news_id, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};