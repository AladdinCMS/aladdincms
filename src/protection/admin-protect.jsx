import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

// Protects admin routes, only allowing access if token exists
export const AdminProtect = ({ children }) => {
  const adminToken = Cookies.get("admin");
  const superAdminToken = Cookies.get("super admin");
  const isAuthenticated = adminToken || superAdminToken;
  
  return isAuthenticated ? children : <Navigate to="/admin/signIn" replace />;
};

// Prevents logged-in admins from accessing sign-in/signup pages
export const PreventAdminAccess = ({ children }) => {
  const adminToken = Cookies.get("admin");
  const superAdminToken = Cookies.get("super admin");
  const isAuthenticated = adminToken || superAdminToken;
  
  return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : children;
};