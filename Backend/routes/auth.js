const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');

const router = express.Router();

// Signup Route
router.post('/signup', (req, res) => {
  const {username, email, password} = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({message: 'Username, email, and password are required.'});
  }

  // Check if the email already exists
  const checkQuery = 'SELECT * FROM person WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err);
      return res.status(500).json({message: 'Database error.'});
    }

    if (results.length > 0) {
      return res
        .status(409)
        .json({message: 'This email is already registered. Please login.'});
    }

    // If email does not exist, proceed with signup

    // Hash the password before saving it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({message: 'Error hashing password'});
      }

      // Insert the new user into the database
      const query =
        'INSERT INTO person (username, email, password) VALUES (?, ?, ?)';
      db.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res
            .status(500)
            .json({message: 'Database error. Could not register user.'});
        }
        res.status(201).json({message: 'User registered successfully!'});
      });
    });
  });
});

// Login Route
router.post('/login', (req, res) => {
  const {email, password} = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({message: 'Email and password are required.'});
  }

  // Query the database for the user
  const query = 'SELECT * FROM person WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error during login query:', err);
      return res.status(500).json({message: 'Database error during login.'});
    }

    // Check if the user exists
    if (results.length > 0) {
      const user = results[0];

      // Compare the entered password with the stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({message: 'Error comparing passwords'});
        }

        if (isMatch) {
          res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
          });
        } else {
          res.status(401).json({message: 'Invalid password'});
        }
      });
    } else {
      res.status(404).json({message: 'User not found'});
    }
  });
});

// Change Password Route
router.post('/change-password', (req, res) => {
  const {email, newPassword} = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({message: 'Email and new password are required'});
  }

  // Hash the new password before saving it
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({message: 'Error hashing password'});
    }

    // Query to find the user by email
    const query = 'SELECT * FROM person WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        return res.status(500).json({message: 'Error checking user'});
      }

      if (results.length === 0) {
        return res.status(404).json({message: 'User not found'});
      }

      // Update the password in the database
      const updateQuery = 'UPDATE person SET password = ? WHERE email = ?';
      db.query(updateQuery, [hashedPassword, email], (err, result) => {
        if (err) {
          return res.status(500).json({message: 'Error updating password'});
        }
        res.status(200).json({message: 'Password changed successfully'});
      });
    });
  });
});

module.exports = router;
