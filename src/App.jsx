import React, { useEffect } from "react"; 
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
// Import CMS components
import CmsLayout from "./pages/admin/cms";
import Dashboard from "./pages/admin/pages/dashboard/page";
import NewsPage from "./pages/admin/pages/content/news/page";
import ProgrammesPage from "./pages/admin/pages/content/programmes/page";
import DocumentsPage from "./pages/admin/pages/content/documents/page";
import UsersPage from "./pages/admin/pages/users/page.jsx";
import DonationsPage from "./pages/admin/pages/donations/page.jsx";
import SignUp from "./pages/login/auth/signup.jsx";
import HeaderNavbar from "./components/Header.jsx";
import BackToTopButton from "./components/bot_2_top.jsx";
import SupportUs from "./pages/external/support/support.jsx";

import TeamsPage from "./pages/admin/pages/team/page.jsx";
import AdminSignIn from "./pages/admin/auth/signIn.jsx";
import AdminSignUp from "./pages/admin/auth/signUp.jsx";
import PageNotFound from "./pages/admin/pages/page-not-found.jsx";
import {
  AdminProtect,
  PreventAdminAccess,
} from "./protection/admin-protect.jsx";
import DonateUs from "./pages/external/donateus/donateUs.jsx";

// Layout wrapper component to conditionally render header and footer

const AppLayout = () => {



  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Set the document title dynamically based on route or condition
    if (location.pathname === "/") {
      document.title = "Green Volunteers - Duke of Edinbrugh Volunteering Opportunities"; // Set default title for homepage
    } else if (location.pathname.startsWith("/admin")) {
      document.title = "Admin Dashboard - The Green Team"; // Set title for admin paths
    } else {
      document.title = "Green Volunteers - Duke of Edinbrugh Volunteering Opportunities"; // Fallback title
    };


    const favicon = document.querySelector("link[rel='icon']");

    if (!favicon) {
      // If favicon doesn't exist, create and append it to head
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.type = "image/png";
      newFavicon.href = "https://i0.wp.com/www.greenteam.org.uk/wp-content/uploads/2020/04/cropped-gt-logo-mark-01.png?fit=32%2C32&ssl=1";
      document.head.appendChild(newFavicon);
    } else {
      // Update existing favicon
      favicon.href = "https://i0.wp.com/www.greenteam.org.uk/wp-content/uploads/2020/04/cropped-gt-logo-mark-01.png?fit=32%2C32&ssl=1";
    }
  }, [location.pathname]);

  return (
    <>
      <main className="overflow-hidden">

        {!isAdminPath && <HeaderNavbar />}
        {!isAdminPath && <div className="pt-33"></div>}
        <BackToTopButton />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Auth page */}

          <Route path="/support" element={<SupportUs />} />
          <Route path="/donateus" element={<DonateUs />} />
          {/* Auth pagee */}


          <Route path="/admin/signIn" element={<AdminSignIn />} />
          <Route path="/admin/signUp" element={<AdminSignUp />} />
          {/* Redirect /admin to /admin/auth */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/signIn" replace />}
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtect>
                <CmsLayout />
              </AdminProtect>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="content/news" element={<NewsPage />} />
            <Route path="content/programmes" element={<ProgrammesPage />} />
            <Route path="content/documents" element={<DocumentsPage />} />
            <Route path="donations" element={<DonationsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="team" element={<TeamsPage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
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
