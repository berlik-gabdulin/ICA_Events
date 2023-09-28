const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db.ica-events.com',
  user: 'icaeventscom_berlik',
  database: 'icaeventscom_main',
  password: 'BerlikAdmin2018',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

connection.query('SELECT * FROM page_solutions', (err, results, fields) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query results:', results);
});

connection.end();
