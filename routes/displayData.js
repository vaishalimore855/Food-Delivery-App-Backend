const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    if (global.food_items) {
      res.send([global.food_items, global.foodCategory]);
      //food items
      console.log(global.food_items);
      //food category
      console.log(global.foodCategory);
    } else {
      res.status(500).send("No food items found.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
