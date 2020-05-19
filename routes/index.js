const express = require('express');
const router = express.Router();


router.get('/api/v1/get', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
