const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors')
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));

app.post('/postMatch', userCtrl.post_match)

app.get('/getHome', userCtrl.get_user_profile)
app.get('/getPreferences', userCtrl.get_user_preferences)
app.get('/shopTillYouDrop', userCtrl.get_shopping)
app.get('/getmatches', userCtrl.get_matches)

app.put('/putHome', userCtrl.put_user_profile)
app.put('/putPreferences', userCtrl.put_user_preferences)

app.delete('/deleteMatch', userCtrl.delete_match)
app.delete('/deleteUserAccount', userCtrl.delete_user_account)

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