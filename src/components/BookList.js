import React, { useEffect, useState } from 'react';
import BookItem from './BookItem';
import BookForm from './BookForm';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:9292/books');
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await fetch('http://localhost:9292/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      const data = await response.json();
      setBooks([...books, data]);
    } catch (error) {
      console.log('Error adding book:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await fetch(`http://localhost:9292/books/${bookId}`, {
        method: 'DELETE',
      });
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.log('Error deleting book:', error);
    }
  };

  const updateBook = async (bookId, updatedBook) => {
    try {
      const response = await fetch(`http://localhost:9292/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      const data = await response.json();
      setBooks(
        books.map((book) => (book.id === bookId ? { ...data } : book))
      );
      setEditBookId(null);
    } catch (error) {
      console.log('Error updating book:', error);
    }
  };

  const handleEdit = (bookId) => {
    setEditBookId(bookId);
  };

  const handleCancelEdit = () => {
    setEditBookId(null);
  };

  return (
    <div className="book-list">
      <h2>Book List</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <>
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              deleteBook={deleteBook}
              updateBook={updateBook}
              editMode={editBookId === book.id}
              onEdit={handleEdit}
              onCancelEdit={handleCancelEdit}
            />
          ))}
        </>
      )}
      {!loading && (
        <div className="add-book-container">
          <BookForm addBook={addBook} />
        </div>
      )}
    </div>
  );
};

export default BookList;
