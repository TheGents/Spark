import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, DrawerNavigator, StackNavigator } from 'react-navigation';
import Login from './App/Screens/Login';
import store from './App/Store';


import WelcomeScreen from './App/Screens/WelcomeToSpark';
import Shopping from './App/components/GoShopping/GoShopping.js';
import Messages from './App/components/Matches/Matches';
import Home from './App/components/Home/Home.js';
import Preferences from './App/components/Preferences/Preferences';
import Setup from './App/components/UserSetup/UserSetup';
import ChatRoom from './App/components/ChatRoom/ChatRoom';
import TermsOfService from './App/components/Preferences/TermsOfService';
import ShowShop from './App/components/GoShopping/ShowShop.js';
import Rating from './App/components/ChatRoom/RateMeBabe/Rate';

class App extends Component {
  render() {
    // const { navigation } = this.props; return <Register navigation={navigation}
    // />;
    
  let MainNavigator = TabNavigator(
    {
      main: {
        screen: DrawerNavigator({
          Welcome: {
            screen: WelcomeScreen
          },
          auth: {
            screen: Login
          },
          Home: {
            screen: Home
          },
        })
      },
      Messages: {
        screen: Messages
      },
      Shopping: {
        screen: Shopping
      },
      ShowShop: {
        screen: ShowShop
      },
      Setup: {
        screen: Setup
      },
      Preferences: {
        screen: Preferences
      },
      Chat: {
        screen: ChatRoom
      },
      Rating: {
        screen: Rating
      },
      TermsOfService: {
        screen: TermsOfService
      }
      
    },
    {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    }
  );
  if (Platform.OS === 'android') {
      MainNavigator = DrawerNavigator({
        Welcome: {
          screen: WelcomeScreen
        },
        auth: {
          screen: Login
        },
        Home: {
          screen: Home
        },
        Messages: {
          screen: Messages
        },
        Shopping: {
          screen: Shopping
        },
        ShowShop: {
          screen: ShowShop
        },
        Preferences: {
          screen: Preferences
        },
        Setup: {
          screen: Setup
        },
        Chat: {
          screen: ChatRoom
        },
        Rating: {
          screen: Rating
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false
        },

        lazy: true
      }
    );
  }


    return (
      <Provider store={store}>
        <MainNavigator />
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
