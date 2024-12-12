import React, { createContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';

// Create the context
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [logoutRestrictedUntil, setLogoutRestrictedUntil] = useState(() =>
    getCookie('logoutRestrictedUntil') ? new Date(getCookie('logoutRestrictedUntil')) : null
  );

  // Load initial authentication state from cookies
  useEffect(() => {
    const savedAuthStatus = getCookie('isAuthenticated');
    const savedUser = getCookie('user');

    if (savedAuthStatus) {
      setIsAuthenticated(true);
    }
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Persist `logoutRestrictedUntil` to cookies
  useEffect(() => {
    if (logoutRestrictedUntil) {
      setCookie('logoutRestrictedUntil', logoutRestrictedUntil);
    } else {
      deleteCookie('logoutRestrictedUntil');
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
    setCookie('isAuthenticated', 'true');
    setCookie('user', data);
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
    deleteCookie('isAuthenticated');
    deleteCookie('user');
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
      value={{ isAuthenticated, login, logout, restrictLogoutForDuration, user, setDeviceId, deviceId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
