const express = require('express');
const router = express.Router();
const { registerIntern } = require('../controllers/interController');

 
router.post('/interns', registerIntern);

module.exports = router;  
