const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || process.env.URL_MONGO;

if (mongoUri && process.env.NODE_ENV !== 'test') {
  mongoose.connect(mongoUri)
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.error("Database connection error:", err.message));
}

module.exports = mongoose;
