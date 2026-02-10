const express = require('express');
const router = express.Router();
const { getResult, getUserResults } = require('../controllers/resultController');
const auth = require('../middleware/auth');

router.get('/:id', auth, getResult);
router.get('/', auth, getUserResults);

module.exports = router;
