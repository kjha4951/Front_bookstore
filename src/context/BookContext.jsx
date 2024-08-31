import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_URI_BACKEND;

// Create a context for book-related operations and user authentication
export const BookContext = createContext();

/**
 * BookProvider component provides book-related data and authentication methods
 * to its children components via context.
 */
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a token exists in local storage and set the user state accordingly
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ email: 'user@example.com' }); // Set the user state (can be replaced with actual email from decoded token if necessary)
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_URL}/api/book`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }
      setLoading(false);
    };

    fetchBooks();
  }, [user]);

  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/book/register`, { email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ email });
    } catch (error) {
      console.error('Registration error:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/book/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ email });
    } catch (error) {
      console.error('Login error:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const addBook = async (newBook) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/book`, newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(prevBooks => [...prevBooks, response.data.book]);
    } catch (error) {
      console.error('Add book error:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/book/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Delete book error:', error.response || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, loading, user, register, login, logout, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
