import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext"; 
import HomePage from "./component/HomePage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <HomePage />
      </Router>
    </AuthProvider>
  );
};

export default App;
