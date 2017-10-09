const express = require('express');
require('dotenv').config({
  path: '../env.env'
});
const path = require('path');
const http = require('http');
const api = require('./api');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 3001;
var server = app.listen(port);
const io = require('socket.io').listen(server);
const helpers = require('./api/helpers');
//connecting to the mongoose database
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
//mongoose Promises are deprecated in Mongoose 4 (think we used mongo3 for sprint)
mongoose.Promise = global.Promise;

// Passport
app.use(session({
  secret: 'huk',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
// app.use(passport.session()); // not using passport sessions anymore
require('../app/passport.js')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//On the server this will serve up our build folder as static files
app.use(express.static(path.join(__dirname, '../client/build')));

//Use the api routes
app.use('/api', api);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (!process.env.DEV) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

io.on('connection', function (socket) {
  socket.on('postMessage', function(obj) {
    if(obj.messsage !== null) {
      helpers.addMessage(obj.message) 
        .then(() =>{
          helpers.getMessages(obj.id)
            .then((messages) => {
              console.log(messages,obj.id);
              var data = {messages: messages}
              io.sockets.emit(obj.id ,data);
            })
            .catch((err) => {
              console.log('error on get messages');
            })    
        });
    } else {
      helpers.getMessages(obj.id)
        .then((messages) => {
          console.log(messages,obj.id);
          var data = {messages: messages}
          io.sockets.emit(obj.id,data);
        })
        .catch((err) => {
          console.log('error on get messages');
        })    
    }
  })
})



console.log(`Server listening on ${port}`);
