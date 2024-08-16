const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// ROUTER
// CREATE USER || POST
router.post(
  "/createuser",
  // validation
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("name")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 5 characters long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({
        name,
        email,
        password: hashedPassword,
        location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router;
