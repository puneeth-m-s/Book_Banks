import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", price: "" });

  // Load books and orders on mount
  useEffect(() => {
    fetchBooks();
    fetchOrders();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      alert("Failed to fetch books.");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Failed to fetch orders.");
    }
  };

  const handleAddBook = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/books",
        newBook,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks([...books, res.data]);
      setNewBook({ title: "", author: "", price: "" });
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Failed to add book.");
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Admin Panel</h2>

      {/* Add New Book */}
      <div style={{ marginBottom: "2rem" }}>
        <h3>Add New Book</h3>
        <input
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      {/* Books List */}
      <div>
        <h3>Books</h3>
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {books.map((book) => (
              <li
                key={book._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <strong>{book.title}</strong> by {book.author} - ₹{book.price}
                </div>
                <button onClick={() => handleDeleteBook(book._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Orders List */}
      <div style={{ marginTop: "2rem" }}>
        <h3>All Orders</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ddd",
                padding: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} (x{item.quantity})
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
