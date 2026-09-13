var express = require('express');
var router = express.Router();
const controller = require('../controllers/travlr');

/* GET travel page. */
router.get('/', controller.travlr);

module.exports = router;