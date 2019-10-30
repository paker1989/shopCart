var mongoose = require('mongoose');
var CalConfig = require('./config/config');

console.log(process.env.NODE_ENV);

const config = process.env.NODE_ENV === '"production"' ? CalConfig.build : CalConfig.dev;

var connection = mongoose.connection(config.dbUrl, {
    useNewUrlParser : true
}).catch(function(err) {
    if (err) {
        console.log('calendar: mongoose connection initial connection failed');
    }
})

connection.on('error', function(err) {
    console.log('calendar: mongoose connection error' + err);
})

connection.on('connected', function() {
    console.log('calendar: mongoose connection succeed..');
})

connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;