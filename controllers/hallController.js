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

exports.showlogin = function (req, res) {
    res.render('login');
}

exports.handle_login = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render('events', {
                'title': 'Staff Events Page',
                user: 'user',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })

};

exports.removeEntry = function (req, res) {
    console.log("title is:" + req.body.title);
    db.removeEntry(req.body.title);
    db.getAllEntries()
        .then((list) => {
            res.render('events', {
                'title': 'Staff Events Page',
                user: 'user',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })

}

exports.show_new_entries = function (req, res) {
    res.render("newEntry", {
        title: "New Event",
        user: "user"
    });
};

exports.post_new_entry = function (req, res) {
    console.log("processing post-new_entry controller");
    if (!req.body.host) {
        response.status(400).send("Entries must have an host.");
        return;
    }
    db.addEntry(req.body.host, req.body.title, req.body.contents, req.body.time, req.body.date);
    db.getAllEntries()
        .then((list) => {
            res.render('events', {
                'title': 'Staff Events Page',
                user: 'user',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })

}

exports.editEntry = function (req, res,) {
    console.log(req.body.title);
    db.find(req.body.title)
        .then((list) => {
            if (list.length == 0) {
                console.log('incorrect entry');
                exit();
            }
            else{
            console.log(list)
            res.render('editEvent', {
                'title': 'Edit Event',
                user: 'user',
                'entries': list
            });
            console.log('promise resolved');
        }
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })

}

exports.editedEntry = function (req, res) {
    console.log(req.body);
    db.update(req.body.id, req.body.host, req.body.title, req.body.contents, req.body.date, req.body.time);
    db.getAllEntries()
        .then((list) => {
            res.render('events', {
                'title': 'Staff Events Page',
                user: 'user',
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}








