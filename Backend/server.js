const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Mount routes
app.use('/auth', require('./routes/auth')); // Mount auth routes

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
