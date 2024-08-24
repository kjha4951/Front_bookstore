import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { BookProvider, BookContext } from './context/BookContext';
import BookList from './component/Listofbook';
import BookForm from './component/Bookform';
import LoginForm from './component/login';
import RegisterForm from './component/registrationform';
import Navbar from './component/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  return user ? children : <Navigate to="/login" />;
};

/**
 * App component sets up the routing for the application and wraps it in the BookProvider.
 * It provides a navigation bar and sets up routes for different pages of the app.
 * 
 * @returns {React.ReactNode} - The application component with routing and context provider
 */
function App() {
  return (
    <BookProvider>
      <Router>
        {/* Navbar component shared across the application */}
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><BookList /></PrivateRoute>} />
          <Route path="/add-book" element={<PrivateRoute><BookForm /></PrivateRoute>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default App;
