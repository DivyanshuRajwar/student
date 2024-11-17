import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutRestrictedUntil, setLogoutRestrictedUntil] = useState(() =>
    localStorage.getItem('logoutRestrictedUntil')
      ? new Date(localStorage.getItem('logoutRestrictedUntil'))
      : null
  );

  // Load initial authentication state
  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated') === 'true';
    const savedUser = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;

    if (savedAuthStatus) {
      setIsAuthenticated(true);
    }
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Persist `logoutRestrictedUntil` to localStorage
  useEffect(() => {
    if (logoutRestrictedUntil) {
      localStorage.setItem('logoutRestrictedUntil', logoutRestrictedUntil);
    } else {
      localStorage.removeItem('logoutRestrictedUntil');
    }
  }, [logoutRestrictedUntil]);

  // Clear restriction when the time has passed
  useEffect(() => {
    if (logoutRestrictedUntil) {
      const now = new Date();
      const timeUntilClear = new Date(logoutRestrictedUntil) - now;

      if (timeUntilClear > 0) {
        const timer = setTimeout(() => {
          setLogoutRestrictedUntil(null);
        }, timeUntilClear);

        return () => clearTimeout(timer);
      } else {
        setLogoutRestrictedUntil(null);
      }
    }
  }, [logoutRestrictedUntil]);

  // Login function
  const login = (data) => {
    setIsAuthenticated(true);
    setUser(data);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(data));
  };

  // Logout function
  const logout = () => {
    const now = new Date();
    if (logoutRestrictedUntil && now < new Date(logoutRestrictedUntil)) {
      alert('You cannot log out yet. Please wait for the restriction to end.');
      return;
    }
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setLogoutRestrictedUntil(null);
  };

  // Restrict logout for a specified duration
  const restrictLogoutForDuration = (durationInMinutes) => {
    const restrictionTime = new Date();
    restrictionTime.setMinutes(restrictionTime.getMinutes() + durationInMinutes);
    setLogoutRestrictedUntil(restrictionTime);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, restrictLogoutForDuration, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
