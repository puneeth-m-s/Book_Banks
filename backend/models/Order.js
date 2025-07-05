const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        title: String,
        price: Number,
        quantity: Number
      }
    ],
    total: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
