const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo/mongo_database')
    .then(db => console.log('Db is connected to', db.connection.host))
    .catch(err => console.log(err));