// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Text,
//   View,
//   Image,
//   Button
// } from 'react-native';

// import Auth0 from 'react-native-auth0';

// let credentials = require('../../Register/auth0-credentials.js');
// const auth0 = new Auth0(credentials);

// export default class LoginButton extends Component {
// constructor(props) {
//         super(props);
//         this.state = { accessToken: null };
//     }
//     _onLogin = () => {
//         auth0.webAuth
//           .authorize({
//             scope: 'openid profile',
//             audience: 'https://' + credentials.domain + '/userinfo'
//           })
//           .then(credentials => {
//             Alert.alert(
//               'Success',
//               'AccessToken: ' + credentials.accessToken,
//               [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
//               { cancelable: false }
//             );
//             this.setState({ accessToken: credentials.accessToken });
//           })
//           .catch(error => console.log(error));
//       };
//     _onLogout = () => {
//     if (Platform.OS === 'android') {
//       this.setState({ accessToken: null });
//     } else {
//       auth0.webAuth
//         .clearSession({})
//         .then(success => {
//           this.setState({ accessToken: null });
//         })
//         .catch(error => console.log(error));
//     }
//   };
//       render() {
//         let loggedIn = this.state.accessToken === null ? false : true;
//         return (
//           <Button
//             onPress={loggedIn ? this._onLogout : this._onLogin}
//             title={loggedIn ? 'Log Out' : 'Log In'}
//             style={{fontSize: 20, color: 'white'}}
//             containerStyle={{height:30, overflow:'hidden', borderRadius:4, backgroundColor: 'black'}}
//              />
//         );
//       }
// }