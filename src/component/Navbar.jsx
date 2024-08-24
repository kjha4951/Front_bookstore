import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';

/**
 * NavbarComponent renders the navigation bar with links and conditional rendering based on authentication state.
 * 
 * Displays different navigation links based on whether the user is authenticated and the current page.
 */
const NavbarComponent = () => {
  // Extract user and logout function from BookContext
  const { user, logout } = useContext(BookContext);

  // Hook to get the current location
  const location = useLocation();

  // Hook for navigation
  const navigate = useNavigate();

  // Determine if the current path is either '/login' or '/register'
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  /**
   * Handle user logout and redirect to login page.
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Book Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!isAuthPage && user && (
            <>
              <Nav.Link as={Link} to="/">Book List</Nav.Link>
              <Nav.Link as={Link} to="/add-book">Add Book</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
          {!user && isAuthPage && (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
