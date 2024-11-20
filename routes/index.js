var express = require('express');
const { showData } = require('../controller/userController');
var router = express.Router();


router.get('/',showData)
module.exports = router;
