const nedb = require('nedb');

class Events {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    init() {
        this.db.insert({
            title: 'Yoga class',
            contents: 'Yoga class for beginners',
            date: '2023-08-11',
            time: '12pm - 1pm',
            host: 'Edith'
        });
        //for debugging
        console.log('db entry Edith inserted');
        this.db.insert({
            title: 'Dance class',
            contents: 'Dance class with Judy',
            date: '2020-02-16',
            time: '9am - 10am',
            host: 'Judy'
        });
        //for debugging
        console.log('db entry Judy inserted');
        this.db.insert({
            title: 'Fitness class',
            contents: 'Running and cycling class for all ages',
            date: '2020-02-16',
            time: '10am - 11pm',
            host: 'Tim'
        });
        //for later debugging
        console.log('db entry Tim inserted');
    }
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    addEntry(host, title, contents, time, date) {
        var entry = {
        host: host,
        title: title,
        contents: contents,
        date: date,
        time: time
        }
        console.log('entry created', entry);
        this.db.insert(entry, function(err, doc) {
        if (err) {
        console.log('Error inserting document', subject);
        } else {
        console.log('document inserted into the database', doc);
        }
        }) 
    } 

    removeEntry(title) {return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
        console.log(title);
        this.db.remove({title:title}, function(err) {
            //if error occurs reject Promise
            if (err) {
                console.log('error')
                reject(err);
            //if no error resolve the promise & return the data
            } else {
                console.log('deleted');
            }
        })
    })

    }

    find(title) {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({title:title}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }

    update(id, host, title, contents, date, time){
        this.db.update({_id:id},{host:host, title:title, contents:contents, date:date, time:time});
    }
}

module.exports = Events;