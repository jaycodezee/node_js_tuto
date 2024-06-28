

// this data is from the data base 
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'mydb',
});

client.connect();

client.query('SELECT * FROM car', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Car Details:');
    res.rows.forEach(row => {
      console.log(`(${row.name}, ${row.brand}, ${row.model}, ${row.year})`);
    });
  }
  client.end();
});
