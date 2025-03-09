import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/about/AboutPage";
import HomePage from "./pages/home/home.jsx";
import Volunteer from "./pages/volunteer/volunteer";
import Contact from "./pages/external/contact/contact.jsx";
import Footer from "./components/Footer";
// Import CMS components
import AuthPage from "./pages/admin/auth/page";
import CmsLayout from "./pages/admin/cms";
import Dashboard from "./pages/admin/pages/dashboard/page";
import NewsPage from "./pages/admin/pages/content/news/page";
import ProgrammesPage from "./pages/admin/pages/content/programmes/page";
import DocumentsPage from "./pages/admin/pages/content/documents/page";
import DonationsPage from "./pages/admin/pages/donations/page";
import VolunteersPage from "./pages/admin/pages/volunteers/page";
import SignIn from "./pages/login/auth/signin.jsx";
import SignUp from "./pages/login/auth/signup.jsx";
import HeaderNavbar from "./components/Header.jsx";

// Layout wrapper component to conditionally render header and footer
const AppLayout = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </BrowserRouter>
        {!isAdminPath && <HeaderNavbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />
          {/* Auth page */}
          <Route path="/admin/auth" element={<AuthPage />} />
          {/* Redirect /admin to /admin/auth */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/auth" replace />}
          />
          {/* CMS Routes - Nested under the CMS Layout */}
          <Route path="/admin" element={<CmsLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="content/news" element={<NewsPage />} />
            <Route path="content/programmes" element={<ProgrammesPage />} />
            <Route path="content/documents" element={<DocumentsPage />} />
            <Route path="donations" element={<DonationsPage />} />
            <Route path="volunteers" element={<VolunteersPage />} />
          </Route>
        </Routes>
        {!isAdminPath && <Footer />}
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;