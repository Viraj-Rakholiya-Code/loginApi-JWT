var express = require('express');
const { showData,loginUser } = require('../controller/userController');
var router = express.Router();


router.post('/',loginUser)
module.exports = router;