// External modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// Internal modules
require('./src/db/mongoose');
const users = require('./src/routes/api/users');
const profile = require('./src/routes/api/profile');
const posts = require('./src/routes/api/posts');

// Initialize app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Port
const PORT = process.env.PORT || 4000;

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./src/passport/auth')(passport);

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Hello, Express!');
});

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Server running
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
