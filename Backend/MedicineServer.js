const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "medicine_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Connected to database");
});

// API Route for Medicine Search
app.get("/getMedicine", (req, res) => {
    const medicineName = req.query.medicine_name;

    if (!medicineName) {
        return res.status(400).json({ error: "Medicine name is required" });
    }

    console.log("Searching for medicine:", medicineName);

    const sqlQuery = `
        SELECT * FROM medicine
        WHERE name LIKE ? 
        ORDER BY (name = ?) DESC, name ASC
    `;
    
    const queryValue = `%${medicineName}%`; // Partial search
    db.query(sqlQuery, [queryValue, medicineName], (err, result) => {
        if (err) {
            console.error("Query Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Medicine not found" });
        }

        res.json(result);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

