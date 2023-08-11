const Datastore = require("nedb");
const bcrypt = require("bcrypt");
var password = 'password1'

class StaffDAO {
    constructor(dbFilePath) {
    if(dbFilePath) {
        this.db = new Datastore({
            filename: dbFilePath,
            autoload: true
        });
    } else {
    this.db = new Datastore();
}
}
init() {
    this.db.insert({
    user: 'John',
    password:
    'password1'
    });
    console.log('db entry John inserted');
    this.db.insert({
    user: 'Jim',
    password: bcrypt.hashSync('password1', 0)
    });
    return this;
     }

     lookup(user, cb) {
        this.db.find({'user': user}, function (err, entries) {
        if (err) {
            return cb(null, null);
        } else {
            if (entries.length == 0) {
                return cb(null, null);
            }
                return cb(null, entries[0]);
            }
        });
    }
    

}

const dao = new StaffDAO;
dao.init();

module.exports = dao;