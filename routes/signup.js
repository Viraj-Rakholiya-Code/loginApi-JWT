var express = require('express');
const { signupUser,showData } = require('../controller/userController');
var router = express.Router();


// router.get('/',showData)
router.post('/',signupUser)
module.exports = router;
