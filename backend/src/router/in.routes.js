const { Router } = require('express');
const {
	adduser,
	getfood,
	buyorder,
	getorder,
	deleteorder,
	deleteusers,
} = require('../controller/index.controller');

const router = Router();

router.post('/adduser', adduser);
router.get('/adduser', getfood);
router.post('/users/:id/orders', buyorder);
router.pgetost('/users/:id/orders', getorder);
router.pgetost('/users/:userId/orders/:orderId', deleteorder);
router.pgetost('/users/:id', deleteusers);

module.exports = router;
