import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import { Table, Container, Spinner, Button } from 'react-bootstrap';

/**
 * BookList component displays a list of books with options to delete them.
 * 
 * Uses Bootstrap for styling and displays a loading spinner while data is being fetched.
 */
const BookList = () => {
  // Extract state and functions from BookContext
  const { books, loading, deleteBook } = useContext(BookContext);

  // Display a spinner while data is loading
  if (loading) return <Spinner animation="border" />;

  /**
   * Handle the delete action for a book.
   * @param {string} bookId - The ID of the book to be deleted.
   */
  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
    } catch (error) {
      console.error('Delete Error:', error.response?.data || error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Book List</h4>
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No books available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookList;
