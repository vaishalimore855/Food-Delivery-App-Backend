const express = require("express");
const router = express.Router();
const Order = require("../models/ordersModel");

router.post("/orderData", async (req, res) => {
  const { order_data, email, order_date } = req.body;

  if (!email || !order_data || !order_date) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    // Prepend the order date to the order data array
    order_data.unshift({ Order_date: order_date });

    // Check if email exists in the database
    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // If email does not exist, create a new order
      await Order.create({ email, order_data: [order_data] });
    } else {
      // If email exists, update the existing order
      await Order.findOneAndUpdate({ email }, { $push: { order_data } });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
