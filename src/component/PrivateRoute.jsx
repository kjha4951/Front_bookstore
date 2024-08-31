import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

/**
 * PrivateRoute component protects routes that require authentication.
 * Redirects unauthenticated users to the login page.
 * 
 * @param {Object} props - The properties object
 * @param {React.ReactNode} props.children - The child elements to render if authenticated
 * @returns {React.ReactNode} - Renders children if authenticated, otherwise redirects to login page
 */
const PrivateRoute = ({ children }) => {
  const { user } = useContext(BookContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Simulate a delay for checking authentication
    const checkAuth = async () => {
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      if (token) {
        // Optionally verify the token or fetch user data here
        // For simplicity, we'll assume token presence means user is authenticated
        setIsCheckingAuth(false);
      } else {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    // Optionally show a loading spinner or placeholder while checking auth status
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
