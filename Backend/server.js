// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());

// // Mount routes
// app.use('/auth', require('./routes/auth')); // Mount auth routes

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Allow frontend to call backend

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend requests

// Mount routes
app.use('/auth', require('./routes/auth')); // Auth routes
app.use('/reviews', require('./routes/reviews')); // Reviews route

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

