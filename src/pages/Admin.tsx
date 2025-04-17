
import React, { useState, useEffect } from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated from localStorage
    const adminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    
    // For development/testing - set to true if not in localStorage
    if (!adminAuthenticated) {
      localStorage.setItem('adminAuthenticated', 'true'); // Store authentication state
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(adminAuthenticated);
    }
    
    console.log("Admin page loaded, authentication set to:", adminAuthenticated || true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('adminAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard />;
};

export default Admin;
