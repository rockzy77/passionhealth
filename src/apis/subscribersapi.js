import axios from 'axios';
axios.defaults.withCredentials = true;

const server_url = "https://api.passionhealthcare.co.uk/";

export const getAllSubscribers = async () => {
    try {
        const token = localStorage.getItem("adminToken");
        const result = await axios.get(server_url + "getAllSubscribers", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return result.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

export const addSubscriber = async (email) => {
    try {
        const result = await axios.post(server_url + "addSubscriber", { email });
        return result.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

export const removeSubscriber = async (email) => {
    try {
        const token = localStorage.getItem("adminToken");
        const result = await axios.delete(server_url + "removeSubscriber", {
            data: { email },          // ← fixed: axios DELETE body must be under `data` key
            headers: { Authorization: `Bearer ${token}` }
        });
        return result.data;
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};