const express = require('express');
const { render } = require('../controllers/markdownController');

const router = express.Router();

router.post('/render', render);

module.exports = router;
