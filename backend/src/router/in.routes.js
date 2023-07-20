const { Router } = require('express');
const {
	adduser,
	getfood,
	buyorder,
	getorder,
} = require('../controller/index.controller');

const router = Router();

router.post('/adduser', adduser);
router.get('/adduser', getfood);
router.post('/users/:id/orders', buyorder);
router.pgetost('/users/:id/orders', getorder);

module.exports = router;
