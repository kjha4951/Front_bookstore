import React, { useState, useContext } from 'react';
import { BookContext } from '../context/BookContext';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
  // State variables for form inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const { addBook } = useContext(BookContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook({ title, author });
      // Clear form fields
      setTitle('');
      setAuthor('');
      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Add Book Error:', error);
      
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Add a New Book</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="w-100"
        >
          Add Book
        </Button>
      </Form>
    </Container>
  );
};

export default BookForm;
