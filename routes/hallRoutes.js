const express = require('express');
const router = express.Router();
const controller = require('../controllers/hallController.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get("/", function(req, res) {
    res.redirect('/home.html');
})
router.get('/about', function(req, res) {
    res.redirect('/about.html');
})

router.get('/contact', function(req, res){
    res.redirect('/bookings.html');
})
router.get('/events', controller.events);

router.get('/login', controller.showlogin);
router.post('/login', login, controller.handle_login);

router.post('/delete', controller.removeEntry);

router.get('/new', verify, controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);

router.post('/edit', controller.editEntry);

router.post('/editevent', controller.editedEntry);

router.use(function(req, res) {
res.status(404);
res.type('text/plain');
res.send('404 Not found.');
})
module.exports = router;