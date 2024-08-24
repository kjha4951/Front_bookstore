import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { Container, Form, Button } from 'react-bootstrap';

/**
 * LoginForm component allows users to log in with their email and password.
**/

const LoginForm = () => {
  // State variables for email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Extract login function from BookContext
  const { login } = useContext(BookContext);

  // Hook for navigation
  const navigate = useNavigate();

  /**
   * Handle form submission for login.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform login and await response
      await login(email, password);
      // Redirect to the home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      // Optionally handle login errors here (e.g., show a message to the user)
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Login</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="w-100"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
