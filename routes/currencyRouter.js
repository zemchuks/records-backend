var express = require('express');
var router = express.Router();
var currencyController = require("../controllers/currencyController");
const {queryRoute} = require("../middlewares/queryMiddleware");


/* GET home page. */
router.get('/', queryRoute, currencyController.getRates);

module.exports = router;