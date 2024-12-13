const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Signup Route
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    // Insert the new user into the database
    const query = 'INSERT INTO person (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Database error. Could not register user.' });
        }
        console.log('Inserted user:', results); // Debug log
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Query the database for the user
    const query = 'SELECT * FROM person WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error during login query:', err);
            return res.status(500).json({ message: 'Database error during login.' });
        }

        // Check if the user exists
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    });
});

module.exports = router;