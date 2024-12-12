// cookies.js

// Utility function to get cookies by name
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      
      if (c.indexOf(nameEQ) === 0) {
        try {
          // Attempt to parse as JSON, and return it
          return JSON.parse(c.substring(nameEQ.length, c.length));
        } catch (error) {
          // If parsing fails, return the cookie as a string
          return c.substring(nameEQ.length, c.length);
        }
      }
    }
    
    return null; // Cookie not found
  };
  
  
  // Utility function to set cookies with an expiration time and attributes for incognito mode
  export const setCookie = (name, value, days = 7) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Expires in 7 days by default
    let expires = "expires=" + d.toUTCString();
  
    // Set the cookie with `Secure`, `SameSite=None`, and `path=/` to ensure it works cross-session
    document.cookie = `${name}=${JSON.stringify(value)}; ${expires}; path=/; Secure; SameSite=None`;
  };
  
  // Utility function to delete cookies
  export const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  };
  