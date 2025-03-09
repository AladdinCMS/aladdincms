import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/about/AboutPage";
import HomePage from "./pages/home/home.jsx";
import Volunteer from "./pages/volunteer/volunteer";
import Contact from "./pages/external/contact/contact.jsx";
import Footer from "./components/Footer";
import DonateUs from "./pages/external/donateus/donateUs.jsx";
// Import CMS components
import CmsLayout from "./pages/admin/cms";
import Dashboard from "./pages/admin/pages/dashboard/page";
import NewsPage from "./pages/admin/pages/content/news/page";
import ProgrammesPage from "./pages/admin/pages/content/programmes/page";
import DocumentsPage from "./pages/admin/pages/content/documents/page";
import DonationsPage from "./pages/admin/pages/donations/page";
import UsersPage from "./pages/admin/pages/users/page.jsx";
import SignUp from "./pages/login/auth/signup.jsx";
import HeaderNavbar from "./components/Header.jsx";
import BackToTopButton from "./components/bot_2_top.jsx";
import SupportUs from "./pages/external/support/support.jsx";

import TeamsPage from "./pages/admin/pages/team/page.jsx";
import AdminSignIn from "./pages/admin/auth/signIn.jsx";
import AdminSignUp from "./pages/admin/auth/signUp.jsx";

// Layout wrapper component to conditionally render header and footer
const AppLayout = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  return (
    <>
      <main>
        {!isAdminPath && <HeaderNavbar />}
        {!isAdminPath && <div className="pt-17"></div>}
        <BackToTopButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportUs />} />
          <Route path="/donateus" element={<DonateUs />} />
          {/* Auth page */}

          <Route path="/admin/signIn" element={<AdminSignIn />} />
          <Route path="/admin/signUp" element={<AdminSignUp />} />
          {/* Redirect /admin to /admin/auth */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/signIn" replace />}
          />
          {/* CMS Routes - Nested under the CMS Layout */}
          <Route path="/admin" element={<CmsLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="content/news" element={<NewsPage />} />
            <Route path="content/programmes" element={<ProgrammesPage />} />
            <Route path="content/documents" element={<DocumentsPage />} />
            <Route path="donations" element={<DonationsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="team" element={<TeamsPage />} />
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
