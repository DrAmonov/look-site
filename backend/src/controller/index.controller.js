exports.adduser = async (req, res) => {
	try {
		const { username, telephone } = req.body;
		const query =
			'INSERT INTO users (username, telephone) VALUES ($1, $2) RETURNING *';
		const values = [username, telephone];

		const result = await pool.query(query, values);
		res.json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

exports.getfood = async (req, res) => {
	try {
		const query = 'SELECT * FROM foods';
		const result = await pool.query(query);
		res.json(result.rows);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

exports.buyorder = async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		const { foodId, quantity } = req.body;

		const foodQuery = 'SELECT * FROM foods WHERE id = $1';
		const foodResult = await pool.query(foodQuery, [foodId]);
		const food = foodResult.rows[0];

		if (!food) {
			return res.status(404).json({ error: 'Food/drink not found!' });
		}

		const orderQuery =
			'INSERT INTO orders (user_id, food_id, food_name, quantity) VALUES ($1, $2, $3, $4) RETURNING *';
		const orderValues = [userId, foodId, food.name, quantity];

		const orderResult = await pool.query(orderQuery, orderValues);
		res.json(orderResult.rows[0]);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};

exports.getorder = async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		const query = 'SELECT * FROM orders WHERE user_id = $1';
		const result = await pool.query(query, [userId]);
		res.json(result.rows);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong!' });
	}
};
