
const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
// const config = require('./config/config.js');
const userCtrl = require('./ctrl/userCtrl');


const app = express();
app.use(json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//     secret: "VincentChrisVuGentApp007",
//     saveUninitialized: false,
//     resave: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
const connectionString = process.env.DATABASE_URL; //Connects to heroku bro
massive(connectionString).then(db => app.set('db', db));

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
app.put('/putLocation', userCtrl.put_user_location);
app.put('/putMatch/:matchedID/:id/:gender/:SwipeMatch', userCtrl.put_match);

app.delete('/deleteMatch', userCtrl.delete_match);
app.get('/deleteUserAccount/:id', userCtrl.delete_user_account);


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

app.listen(process.env.PORT, () => { console.log('Listening on port: 3000'); });
