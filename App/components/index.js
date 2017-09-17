// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {

//   StyleSheet,
//   Image,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';


// import { Navigator } from 'react-native-deprecated-custom-components';
// import Shop from './GoShopping/GoShopping';
// import Messages from './Matches/Matches';
// import Profile from './Profile/profile';



// export default class Index extends Component {
//   constructor(props){
//     super(props)
 
//   }
 
//   renderScene(route, navigator) {
//     var {state,actions} = this.props;
//     var routeId = route.id;

//     if (routeId === 'shop') {
//       return (
//         <Shop
//         {...this.props} 
//         userData ={route.userData}
//         navigator={navigator} />
//         );
//     }
//     if (routeId === 'messages') {
//       return (
//         <Messages
//         {...this.props} 
//         userData ={route.userData}
//         navigator={navigator} />
//         );
//     }
//     if (routeId === 'profile') {
//       return (
//         <Profile
//         {...this.props} 
//         userData ={route.userData}
//         navigator={navigator} />
//         );
//     }
//   }


//   render() {
//     return (
//       <View style={{flex:1}}>
//      <Navigator
//      style={{flex: 1}}
//      ref={'NAV'}
//      initialRoute={{id: 'home', name: 'home'}}
//      renderScene={this.renderScene.bind(this)}/>
//         </View>
//     )
// }
// }


