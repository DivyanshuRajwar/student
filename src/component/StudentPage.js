import React,{useContext} from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginSignupForm from './LoginSignupForm';
import { AuthContext } from '../context/AuthContext';
import Student from './Student';
import HomePage from './HomePage';
const StudentPage = () => {
    const{ isAuthenticated} = useContext(AuthContext);
  return (
    <div className="w-screen  flex justify-center items-center h-screen bg-gray-100">
    <Routes>
        <Route path="/*" element={(isAuthenticated) ? <HomePage />: <LoginSignupForm /> } />
        <Route path="login" element={<LoginSignupForm />} />
        <Route  path='student-attendance' element={(isAuthenticated) ? <Student />: <LoginSignupForm /> }/>
    </Routes>
     
    </div>
  );
};
export default StudentPage;
