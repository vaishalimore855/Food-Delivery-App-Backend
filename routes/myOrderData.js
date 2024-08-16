const express = require("express");
const router = express.Router();
const Order = require("../models/ordersModel");

router.post("/myOrderData", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    let eId = await Order.findOne({ email });

    if (!eId) {
      return res.status(404).json({ error: "No orders found for this email" });
    }

    res.json({ orderData: eId });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
