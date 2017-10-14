// import Axios from 'axios';

const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');
const io = require('socket.io')();


// const port = 8000;
// const passport = require('passport');
// const Auth0Strategy = require('passport-auth0');


// io.on('connection', (client) => {
//     client.on('subscribeToTimer', (interval, roomID) => {
//       console.log('client is subscribing to timer with interval ', interval);
      
//       setInterval(() => {
//         client.emit('timer', Axios.get(`http://localhost:8080/getmessage/${roomID}`).then((response) => {
//             return response.data;
//         }));
//       }, interval);
//     });
//   });

// io.listen(port);
// console.log(`listening on port ${port}`);

// const config = require('./config/config.js');
const userCtrl = require('./ctrl/userCtrl.js')
const loginCtrl = require('./ctrl/loginCtrl.js')

const app = express();
app.use(json());
app.use(cors());
app.use(session({
    secret: "VincentChrisVuGentApp007",
    saveUninitialized: false,
    resave: true
}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static('./public'));

app.post('/postMatch', userCtrl.post_match);
app.post('/addUser', userCtrl.post_user);
app.post('/postmessage', userCtrl.post_message);
app.post('/postRate', userCtrl.post_rate);

app.get('/getHome/:id', userCtrl.get_user_profile);
app.get('/getPreferences', userCtrl.get_user_preferences);
app.get('/shopTillYouDrop/:gender', userCtrl.get_shopping);
app.get('/getRating/:id', userCtrl.get_rating);
app.get('/getmatches/:id/:gender', userCtrl.get_matches);
app.get('/shopFiltered/:id/:gender', userCtrl.get_filtered);
app.get('/getPrematch/:id/:gender', userCtrl.get_prematch);
app.get('/getmessage/:room_id', userCtrl.get_message);

app.put('/putPics', userCtrl.put_user_pics);
app.put('/putHome', userCtrl.put_user_profile);
app.put('/putBio', userCtrl.put_user_bio);
app.put('/putPreferences', userCtrl.put_user_preferences);
app.put('/putMatch/:matchedID/:id/:gender/:SwipeMatch', userCtrl.put_match);

app.delete('/deleteMatch', userCtrl.delete_match);
app.delete('/deleteUserAccount', userCtrl.delete_user_account);

const connectionString = process.env.DATABASE_URL; //Connects to heroku bro
massive(connectionString).then(db => app.set('db', db));

// passport.use(new Auth0Strategy(config.auth0, (accessToken, refreshToken, extraParams, profile, done) => {
//     // console.log(profile)
//     const db = app.get('db');
//     db.getUserByAuthId([profile.id]).then((user) => {
//         if (user.length < 1) { 
//             db.createUserByAuth([profile.displayName, profile.id]).then((user) => {
//             return done(null, user[0]); 
//             })
//         } 
//         else { 
//         //console.log('FOUND USER', user);
//         return done(null, user);
//       }
//     });
//   }
// ));

// passport.serializeUser(loginCtrl.serialize);

// passport.deserializeUser(loginCtrl.deserialize);

app.listen(process.env.PORT, () => { console.log(`Listening on port: ${process.env.PORT}`)});