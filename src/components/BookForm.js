import React, { useState } from 'react';
import './BookForm.css';


const BookForm = ({ addBook, editBook, initialFormData, clearForm }) => {
  const [formData, setFormData] = useState(initialFormData || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.author) {
      if (editBook) {
        editBook(formData);
        clearForm();
      } else {
        addBook(formData);
        setFormData({});
      }
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author || ''}
        onChange={handleChange}
      />
      <button type="submit">{editBook ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
};

export default BookForm;
