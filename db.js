const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Database`);
    //fetch food items data
    const fetch_data = await mongoose.connection.db.collection("food_items");
    console.log("fetch_data", fetch_data);

    const data = await fetch_data.find({}).toArray(function (error, data) {
      if (error) console.log(error);
      else {
        console.log();
      }
    });

    global.food_items = data;
    console.log(global.food_items);
    //fetch food category data
    const fetchCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    console.log("fetchCategory", fetchCategory);

    const cData = await fetchCategory.find({}).toArray(function (error, data) {
      if (error) console.log(error);
      else {
        console.log(data);
      }
    });

    global.foodCategory = cData;
    console.log(global.foodCategory);
  } catch (error) {
    console.error(`DB error: ${error.message}`);
    process.exit(1); // Exit the application if the DB connection fails
  }
};

module.exports = connectDB;
