import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext"; // Importing AuthProvider
import StudentPage from "./component/StudentPage"; // Your StudentPage component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <StudentPage />
      </Router>
    </AuthProvider>
  );
};

export default App;
