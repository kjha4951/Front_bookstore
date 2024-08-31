import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { BookContext } from '../context/BookContext';

/**
 * RegisterForm component allows users to register by providing their email and password.
 * 
 * It handles form submission and redirects to the login page upon successful registration.
 */
const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register } = useContext(BookContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      setTimeout(() => {
        setError('');
      }, 1000);
      return;
    }
    try {
      await register(email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Register</h4>
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success">
          Successfully registered! Redirecting to login page in 2 seconds...
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;