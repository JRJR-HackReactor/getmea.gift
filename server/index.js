const express = require('express');
require('dotenv').config({
  path: '../.env'
});
const path = require('path');
const http = require('http');
const api = require('./api');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


//connecting to the mongoose database
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
//mongoose Promises are deprecated in Mongoose 4 (think we used mongo3 for sprint)
mongoose.Promise = global.Promise;

// Passport
app.use(session({secret: 'G3tM3@.g1f+', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
require('../app/passport.js')(passport);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', api);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (!process.env.DEV) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server listening on ${port}`);
