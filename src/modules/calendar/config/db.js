var mongoose = require('mongoose');
var CalConfig = require('../config/config');

console.log(process.env.NODE_ENV);

const config = process.env.NODE_ENV === '"production"' ? CalConfig.build : CalConfig.dev;

mongoose.connect(config.dbUrl, {
    useNewUrlParser : true,
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10,
}).catch(function(err) {
    if (err) {
        console.log('calendar: mongoose connection initial connection failed');
    }
})

mongoose.connection.on('error', function(err) {
    console.log('calendar: mongoose connection error' + err);
})

mongoose.connection.on('connected', function() {
    console.log('calendar: mongoose connection succeed..');
})

mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;