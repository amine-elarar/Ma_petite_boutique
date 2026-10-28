const mongoose = require('mongoose');

mongoose.connect(process.env.URL_MONGO)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.error("Database connection error:", err.message));