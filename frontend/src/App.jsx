import React, { useState, useEffect } from 'react';
import Login from './components/LoginPage'; 
import ProfessionalDashboard from './components/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read directly from storage on boot up
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
        <h2>Loading Terminal Security Systems...</h2>
      </div>
    );
  }

  // Pure clean state switch
  if (isAuthenticated) {
    return <ProfessionalDashboard />;
  } else {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }
}