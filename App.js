import React, { Component } from 'react';
import ScrollView from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Login from './App/Screens/Login';
import store from './App/Store';

import WelcomeScreen from './App/Screens/WelcomeToSpark';
import Register from './App/components/Register/Register.js';
import Profile from './App/components/ShopProfile/profile.js';
import GoShopping from './App/components/GoShopping/ShowShop.js';
import Messages from './App/components/Matches/Matches';
import UserProfile from './App/components/UserProfile/UserProfile.js';
import UserPreferences from './App/components/UserPreferences/UserPreferences';

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
        Home: { screen: UserProfile },
        Profile: { screen: Profile },
        Settings: { screen: UserPreferences },
        Register: { screen: Register },
        Shopping: { screen: GoShopping }

      },
      {
        lazyLoad: true
      }
    );

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
//     // UserPreferences: { screen: UserPreferences },
//     // UserProfile: { screen: UserProfile },
//     // UserSetup: { screen: UserSetup },
//     // UserPreferences: { screen: UserPreferences },
//   },
//   { headerMode: 'none' }
// );