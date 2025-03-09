import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

// Protects admin routes, only allowing access if token exists
export const AdminProtect = ({ children }) => {
  const token = Cookies.get("admin");
  return token ? children : <Navigate to="/admin/signIn" replace />;
};

// Prevents logged-in admins from accessing sign-in/signup pages
export const PreventAdminAccess = ({ children }) => {
  const token = Cookies.get("admin");
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
};
