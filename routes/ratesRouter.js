const express = require('express');
const router = express.Router();
const getCurrencyRates = require("../controllers/currencyRates");
const queryRoute  = require("../middlewares/queryMiddleware");


/* GET home page. */
router.get('/', queryRoute, getCurrencyRates);

module.exports = router;