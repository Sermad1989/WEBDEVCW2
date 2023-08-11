const express = require('express');
const router = express.Router();
const controller = require('../controllers/hallController.js');

router.get("/", function(req, res) {
    res.redirect('/home.html');
})
router.get('/about', function(req, res) {
    res.redirect('/about.html');
})
router.get('/events', controller.events);
    
router.use(function(req, res) {
res.status(404);
res.type('text/plain');
res.send('404 Not found.');
})
module.exports = router;