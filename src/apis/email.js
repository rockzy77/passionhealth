import axios from 'axios';
axios.defaults.withCredentials = true;

const server_url = "https://api.passionhealthcare.co.uk/";

export const sendContactForm = async (name, email, message) => {
    try {
        const result = await axios.post(server_url + 'contact', { name, email, message });
        return result.data;
    } catch (err) {
        return { success: false };
    }
};

export const sendSubscribeEmail = async (name, email) => {
    try {
        const result = await axios.post(server_url + 'subscribeMail', { name, email });
        return result.data;
    } catch (err) {
        return { success: false };
    }
};

export const sendCareerEmail = async (name, email, phone, address, resume) => {
    try {
        // Use FormData to support file upload (resume)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('pdf', resume); // must match upload.single('pdf') in router

        const result = await axios.post(server_url + 'careerEmail', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return result.data;
    } catch (err) {
        return { success: false };
    }
};