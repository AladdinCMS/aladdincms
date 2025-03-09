import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import HeaderNavbar from './components/Header.jsx';
import HomePage from "./pages/home/home.jsx";
import Volunteer from "./pages/volunteer/volunteer.jsx";
import Contact from "./pages/external/contact/contact.jsx";
import Footer from "./components/Footer.jsx";
// Import CMS components
import AuthPage from './pages/admin/auth/page.jsx'
import CmsLayout from './pages/admin/cms.jsx'
import Dashboard from './pages/admin/pages/dashboard/page.jsx'
import NewsPage from './pages/admin/pages/content/news/page.jsx'
import ProgrammesPage from './pages/admin/pages/content/programmes/page.jsx'
import DocumentsPage from './pages/admin/pages/content/documents/page.jsx'
import DonationsPage from './pages/admin/pages/donations/page.jsx'
import VolunteersPage from './pages/admin/pages/volunteer/page.jsx'
import SignIn from "./pages/login/auth/signin.jsx";
import SignUp from "./pages/login/auth/signup.jsx";
// programms page
import GreenVolunteersPage from "./pages/admin/pages/programs/green.jsx";
import SupportUs from "./pages/external/support/support.jsx";


function App() {
  // In a real app, you would check for auth status from your auth context/provider
  // For the hackathon, let's just redirect to the auth page when accessing admin routes
  return (
    <main>
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
  );
}

export default App