import React, {Component} from 'react';
import ScrollView from 'react-native';
import {Provider} from 'react-redux';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Login from './App/Screens/Login';
import store from './App/Store';

import WelcomeScreen from './App/Screens/WelcomeToSpark';
import Profile from './App/components/ShopProfile/profile.js';
import Shopping from './App/components/GoShopping/GoShopping.js';
import Messages from './App/components/Matches/Matches';
import Home from './App/components/Home/Home.js';
import Preferences from './App/components/Preferences/Preferences';
import Setup from './App/components/UserSetup/UserSetup';
import ChatRoom from './App/components/ChatRoom/ChatRoom';

class App extends Component {
  // static navigationOptions = {   header: null };
  render() {
    // const { navigation } = this.props; return <Register navigation={navigation}
    // />;

    const MainNavigator = TabNavigator({
      Welcome: {
        screen: WelcomeScreen
      },
      auth: {
        screen: Login
      },
      Home: {
        screen: Home
      },
      Settings: {
        screen: Preferences
      },
      Messages: {
        screen: Messages
      },
      Shopping: {
        screen: Shopping
      },
      Setup: {
        screen: Setup
      },
      Preferences: {
        screen: Preferences
      },
      Chat: {
        screen: ChatRoom
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <MainNavigator/>
      </Provider>
    );
  }
}

export default App;

// const DaGents = StackNavigator(   {     Home: { screen: Register }, Profile:
// { screen: Profile },     GoShopping: { screen: GoShopping }, Matches: {
// screen: Messages }     // Preferences: { screen: Preferences },  // Home: {
// screen: Home },     // UserSetup: { screen: UserSetup },     // Preferences:
// { screen: Preferences },   },   { headerMode: 'none' } );