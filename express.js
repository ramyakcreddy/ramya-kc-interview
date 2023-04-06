const express = require('express');
const app = express();
const port = 3000;

// Database setup
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_e_commerce_db'
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

// Middleware setup
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to my e-commerce platform!');
});

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error getting products from database: ' + err.stack);
      res.status(500).send('Error getting products from database.');
    } else {
      res.send(results);
    }
  });
});

app.post('/checkout', (req, res) => {
  const { name, email, address, products } = req.body;

  // Process payment and update inventory
  // ...

  res.send('Checkout successful!');
});

// Server setup
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
