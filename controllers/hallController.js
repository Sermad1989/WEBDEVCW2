const eventsDAO = require('../models/eventsModel');
const db = new eventsDAO();

db.init();


exports.landing_page = function (req, res) {
    res.redirect('/home.html');
}

exports.events = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render('events', {
                'title': 'Events',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

