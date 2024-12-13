const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost', // XAMPP MySQL host
  user: 'root', // Default MySQL username
  password: '', // Default MySQL password
  database: 'user_auth', // Your database name
});

// Check MySQL connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Hash the password before saving it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    // Query to insert the new user into the database
    const query =
      'INSERT INTO person (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user: ', err);
        return res.status(500).send('Error inserting user into database');
      }
      res.status(201).send('User created successfully');
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Query to find the user by email
  const query = 'SELECT * FROM person WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Error checking credentials');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];

    // Compare the entered password with the stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Error comparing passwords');
      }

      if (!isMatch) {
        return res.status(401).send('Invalid password');
      }

      res.status(200).send('Login successful');
    });
  });
});

// Change Password endpoint
app.post('/change-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).send('Email and new password are required');
  }

  // Hash the new password before saving it
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    // Query to find the user by email
    const query = 'SELECT * FROM person WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        return res.status(500).send('Error checking user');
      }

      if (results.length === 0) {
        return res.status(404).send('User not found');
      }

      // Update the password in the database
      const updateQuery = 'UPDATE person SET password = ? WHERE email = ?';
      db.query(updateQuery, [hashedPassword, email], (err, result) => {
        if (err) {
          console.error('Error updating password: ', err);
          return res.status(500).send('Error updating password');
        }
        res.status(200).send('Password changed successfully');
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
