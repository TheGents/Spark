import React, { Component } from 'react';
import ScrollView from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Login from './App/Screens/Login';
import store from './App/Store';

import WelcomeScreen from './App/Screens/WelcomeToSpark';
import Profile from './App/components/ShopProfile/profile.js';
import GoShopping from './App/components/GoShopping/ShowShop.js';
import Messages from './App/components/Matches/Matches';
import UserProfile from './App/components/UserProfile/UserProfile.js';
import Preferences from './App/components/Preferences/Preferences';

class App extends Component {
  // static navigationOptions = {
  //   header: null
  // };
  render() {
    // const { navigation } = this.props;
    // return <Register navigation={navigation} />;

    const MainNavigator = TabNavigator(
      {
        Welcome: { screen: WelcomeScreen },
        auth: { screen: Login },
        Profile: { screen: Profile },
        Settings: { screen: Preferences },
        Shopping: { screen: GoShopping },
      },
      {
        navigationOptions: {
          tabBarVisible: false 
        },
        lazyLoad: true
      });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;

// const DaGents = StackNavigator(
//   {
//     Home: { screen: Register },
//     Profile: { screen: Profile },
//     GoShopping: { screen: GoShopping },
//     Matches: { screen: Messages }
//     // Preferences: { screen: Preferences },
//     // UserProfile: { screen: UserProfile },
//     // UserSetup: { screen: UserSetup },
//     // Preferences: { screen: Preferences },
//   },
//   { headerMode: 'none' }
// );