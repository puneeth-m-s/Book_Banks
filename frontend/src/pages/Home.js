import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../contexts/CartContext";

const Home = () => {
  const [books, setBooks] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container">
      <h2>Book List</h2>
      <div
        className="book-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem"
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            className="book-card"
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "4px"
            }}
          >
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>₹{book.price}</p>
            <button
              onClick={() => addToCart(book)}
              style={{
                padding: "0.5rem",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "0.5rem"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
