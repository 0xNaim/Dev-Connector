const mongoose = require('mongoose');

// Connect to MongoDB
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k2olu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err.message));
