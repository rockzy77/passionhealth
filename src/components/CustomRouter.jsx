import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import CareGiversPage from "../pages/OurCareGivers";
import SpecialistCarePage from "../pages/SpecialistCare";
import ServicesPage from "../pages/Services";
import ContactPage from "../pages/Contact";
import NewsPage from "../pages/News";
import NewsDetailPage from "../pages/NewsDetails";
import CareersPage from "../pages/Careers";
import AdminLoginPage from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";

const CustomRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/our-care-givers" element={<CareGiversPage />}></Route>
            <Route path="/specialist-care" element={<SpecialistCarePage />}></Route>
            <Route path="/services" element={<ServicesPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/news" element={<NewsPage />}></Route>
            <Route path="/news/:id" element={<NewsDetailPage />}></Route>
            <Route path="/careers" element={<CareersPage />}></Route>
            <Route path="/admin" element={<AdminLoginPage />}></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        </Routes>
    </BrowserRouter>
}

export default CustomRouter;