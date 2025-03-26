const express = require('express');
const db = require('../db'); 
const router = express.Router();

// GET: Fetch Reviews with Usernames
router.get('/', (req, res) => {
  const sql = `
    SELECT reviews.id, reviews.user_id, person.username, reviews.rating, reviews.review_text, reviews.created_at 
    FROM reviews 
    JOIN person ON reviews.user_id = person.id 
    ORDER BY reviews.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      console.error('SQL Query:', sql); //Log the sql query
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(results);
  });
});

// POST: Submit a New Review
router.post('/', (req, res) => {
  console.log('Received Review Data:', req.body);

  const { user_id, rating, review_text } = req.body;

  if (!user_id || !rating || !review_text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO reviews (user_id, rating, review_text) VALUES (?, ?, ?)';

  db.query(sql, [user_id, rating, review_text], (err, result) => {
    if (err) {
      console.error('Error inserting review:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    console.log("Review inserted successfully:", result);
    res.json({ message: 'Review submitted successfully' });
  });
});

module.exports = router;