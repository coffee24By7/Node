// import environmental variables from our variables.env file
const config = require('dotenv').config().parsed;
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

//constants
const STYLES_PATH = './src/styles/css';
const JS_PATH = './dist';
const VIEW_PATH = path.join('./src/views');

if (config.LOG_LEVEL > 0) {
  console.log('config: ');
  console.log(config);
  console.log(`CWD: ${process.cwd()}`)
  console.log(`VIEW_PATH: ${VIEW_PATH}`);
  console.log(`STYLES_PATH: ${STYLES_PATH}`);
  console.log(`JS_PATH: ${JS_PATH}`);
  console.log(`process.env.DATABASE: ${config.DATABASE}`);
}

// const MongoStore = require('connect-mongo')(session);

// // Make sure we are running node 7.6+
// const [major, minor] = process.versions.node.split('.').map(parseFloat);
// if (major < 7 || (major === 7 && minor <= 5)) {
//   console.log('\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. ??\n ');
//   process.exit();
// }

// Connect to our Database and handle any bad connections
mongoose.connect(config.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(` ${err.message}`);
});

// create our Express app
const app = express();

// view engine setup
app.set('views', VIEW_PATH); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use('/js',  express.static(JS_PATH));
app.use('/css', express.static(STYLES_PATH));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
// app.use(session({
//   secret: process.env.SECRET,
//   key: process.env.KEY,
//   resave: false,
//   saveUninitialized: false,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

// check environment correctly setup
if (config.KEY !== 'caffiene24by7') {
  console.log('Environment not correctly set')
} else {
  console.log(`Our Session Secret ?  ${config.SECRET}`);
  console.log(`Our Session Key ?  ${config.KEY}`);
  console.log(`Our Map Key ?  ${config.MAP_KEY}`);
}

// Use this instead
app.use(session({
  secret: config.SECRET,   
  key: config.KEY,
  resave: true,
  saveUninitialized: true
  // ,store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// Start our app!
app.set('port', config.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running ? PORT ${server.address().port}`);
});

// done! we export it so we can start the site in start.js
module.exports = app;
