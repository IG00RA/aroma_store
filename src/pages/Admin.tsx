import React, { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const adminAuthenticated =
      localStorage.getItem("adminAuthenticated") === "true";
    setIsAuthenticated(adminAuthenticated);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("adminAuthenticated", "true");
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard />;
};

export default Admin;
