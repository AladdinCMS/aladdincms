import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import your existing pages
import ExternalPage from './pages/external/page'
import ParticipantPage from './pages/participant/page'
import VolunteerPage from './pages/volunteer/page'
import AuthPage from './pages/admin/auth/page'

// Import CMS components
import CmsLayout from './pages/admin/cms'
import Dashboard from './pages/admin/pages/dashboard/page'
import NewsPage from './pages/admin/pages/content/news/page'
import ProgrammesPage from './pages/admin/pages/content/programmes/page'
import DocumentsPage from './pages/admin/pages/content/documents/page'
import DonationsPage from './pages/admin/pages/donations/page'
import VolunteersPage from './pages/admin/pages/volunteers/page'

function App() {
  // In a real app, you would check for auth status from your auth context/provider
  // For the hackathon, let's just redirect to the auth page when accessing admin routes
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExternalPage />} />
        <Route path="/participant" element={<ParticipantPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        
        {/* Auth page */}
        <Route path="/admin/auth" element={<AuthPage />} />
        
        {/* Redirect /admin to /admin/auth */}
        <Route path="/admin" element={<Navigate to="/admin/auth" replace />} />
        
        {/* CMS Routes - Nested under the CMS Layout */}
        {/* In a real app, these would be protected routes */}
        <Route path="/admin" element={<CmsLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="content/news" element={<NewsPage />} />
          <Route path="content/programmes" element={<ProgrammesPage />} />
          <Route path="content/documents" element={<DocumentsPage />} />
          <Route path="donations" element={<DonationsPage />} />
          <Route path="volunteers" element={<VolunteersPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App