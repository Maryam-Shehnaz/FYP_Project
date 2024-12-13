const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // Your MariaDB server address
  user: 'root',      // Your database username
  password: '',      // Your database password (empty in your case)
  database: 'user_auth', // Your database name
  port: 3306,        // Default MariaDB/MySQL port
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL as ID ' + connection.threadId);
});


