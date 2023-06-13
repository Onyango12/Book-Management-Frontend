import React from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import './App.css';

const App = () => {
  const addBook = (book) => {
    // Implement your logic to add the book to the API
    console.log('Adding book:', book);
  };

  return (
    <div className="app">
      <Header />
      <BookList />
      {/* <BookForm addBook={addBook} /> */}
    </div>
  );
};

export default App;
