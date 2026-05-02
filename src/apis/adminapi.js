import axios from 'axios';
axios.defaults.withCredentials = true;

const server_url = "https://api.passionhealthcare.co.uk/";

export const adminLogin = async (email, password) => {
    try {
        const result = await axios.post(server_url + "adminLogin", { email, password });
        return result.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

export const validateToken = async () => {
    try {
        const token = localStorage.getItem("adminToken");
        if (!token) return { success: false };

        const result = await axios.get(server_url + "validateToken", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return result.data;
    } catch (err) {
        // Axios throws on 401/403 — catch and return structured error
        const error = err.response?.data?.error || err.response?.data?.message;
        return { success: false, error };
    }
};