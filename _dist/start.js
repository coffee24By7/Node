var mongoose = require('mongoose');
// Make sure we are running node 7.6+
var _a = process.versions.node.split('.').map(parseFloat), major = _a[0], minor = _a[1];
if (major < 7 || (major === 7 && minor <= 5)) {
    console.log('\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. ??\n ');
    process.exit();
}
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });
// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', function (err) {
    console.error(" " + err.message);
});
// READY?! Let's go!
// Start our app!
var app = require('./app');
app.set('port', process.env.PORT || 7777);
var server = app.listen(app.get('port'), function () {
    console.log("Express running ? PORT " + server.address().port);
});
