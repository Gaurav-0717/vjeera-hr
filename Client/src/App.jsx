import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Services from "./pages/Services.jsx";
import Courses from "./pages/Courses.jsx";
import Career from "./pages/Career.jsx";
import Corporate from "./pages/Corporate.jsx";
import OurClient from "./pages/OurClient.jsx";
import Contact from "./pages/Contact.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import {
  AdminContacts,
  AdminEnrollments,
  AdminApplications,
  AdminCorporate,
  AdminRecordsHome,
} from "./pages/admin/AdminRecords.jsx";
import AdminJobs from "./pages/admin/AdminJobs.jsx";
import AdminCourses from "./pages/admin/AdminCourses.jsx";

function PublicLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="records" element={<AdminRecordsHome />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="enrollments" element={<AdminEnrollments />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="corporate-enquiries" element={<AdminCorporate />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="courses" element={<AdminCourses />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/career" element={<Career />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/our-client" element={<OurClient />} />
        <Route path="/clients" element={<OurClient />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
