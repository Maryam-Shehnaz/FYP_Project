const mysql = require('mysql2'); // Make sure `mysql2` is installed

// Create a connection pool
const pool = mysql.createPool({
  host: '127.0.0.1', // Your MariaDB server address
  user: 'root',      // Your database username
  password: '',      // Your database password (empty in your case)
  database: 'user_auth', // Your database name
  port: 3306,        // Default MariaDB/MySQL port
  
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the MariaDB database:', err.message);
  } else {
    console.log('Connected to the MariaDB database successfully!');
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = pool;
