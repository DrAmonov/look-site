CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  telephone VARCHAR(11) NOT NULL
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  img VARCHAR(200) NOT NULL,
  count INTEGER NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  food_id INTEGER REFERENCES foods(id),
  food_name VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL
);


const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

-- // Replace the connection string with your PostgreSQL connection details
const pool = new Pool({
  user: 'your_pg_username',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_pg_password',
  port: 5432,
});

app.use(express.json());

-- // Add a new user to the database
app.post('/users', async (req, res) => {
  try {
    const { username, telephone } = req.body;
    const query = 'INSERT INTO users (username, telephone) VALUES ($1, $2) RETURNING *';
    const values = [username, telephone];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

-- // Get all available foods/drinks
app.get('/foods', async (req, res) => {
  try {
    const query = 'SELECT * FROM foods';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

-- // Add a new food/drink order for a user
app.post('/users/:id/orders', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { foodId, quantity } = req.body;

    // First, check if the food/drink with the given ID exists
    const foodQuery = 'SELECT * FROM foods WHERE id = $1';
    const foodResult = await pool.query(foodQuery, [foodId]);
    const food = foodResult.rows[0];

    if (!food) {
      return res.status(404).json({ error: 'Food/drink not found!' });
    }

    // Now, create the order
    const orderQuery =
      'INSERT INTO orders (user_id, food_id, food_name, quantity) VALUES ($1, $2, $3, $4) RETURNING *';
    const orderValues = [userId, foodId, food.name, quantity];

    const orderResult = await pool.query(orderQuery, orderValues);
    res.json(orderResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

-- // Get all orders for a specific user by ID
app.get('/users/:id/orders', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const query = 'SELECT * FROM orders WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
