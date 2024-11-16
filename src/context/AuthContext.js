import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    if (savedAuthStatus) {
      setIsAuthenticated(true);
    }
  }, []);
  //stop log out for 5 mins
  const [logoutRestrictedUntil, setLogoutRestrictedUntil] = useState(() => 
    localStorage.getItem('logoutRestrictedUntil') ? 
    new Date(localStorage.getItem('logoutRestrictedUntil')) : null
  );

  useEffect(() => {
    if (logoutRestrictedUntil) {
      localStorage.setItem('logoutRestrictedUntil', logoutRestrictedUntil);
    } else {
      localStorage.removeItem('logoutRestrictedUntil');
    }
  }, [logoutRestrictedUntil]);


  // Login function
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    const now = new Date();
    if (logoutRestrictedUntil && now < new Date(logoutRestrictedUntil)) {
      alert('You cannot log out yet. Please wait for the restriction to end.');
      return;
    }
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setLogoutRestrictedUntil(null);
  };

  const restrictLogoutForDuration = (durationInMinutes) => {
    const restrictionTime = new Date();
    restrictionTime.setMinutes(restrictionTime.getMinutes() + durationInMinutes);
    setLogoutRestrictedUntil(restrictionTime);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,restrictLogoutForDuration }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
