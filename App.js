import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import {  StackActions, createTabNavigator, createDrawerNavigator, StackNavigator } from 'react-navigation';
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

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ main: 'WelcomeScreen' }),
//     NavigationActions.navigate({ Setup: 'Setup' }),
//     NavigationActions.navigate({ Preferences: 'Preferences' }),
//     NavigationActions.navigate({ Shopping: 'Shopping' }),
//     NavigationActions.navigate({ ShowShop: 'ShowShop' }),
//     NavigationActions.navigate({ Messages: 'Messages' }),
//     NavigationActions.navigate({ Chat: 'Chat' }),
//     NavigationActions.navigate({ Rating: 'Rating' }),
//     NavigationActions.navigate({ TermsOfService: 'TermsOfService' })
// ],
// });
// this.props.navigation.dispatch(resetAction);

class App extends Component {
  render() {
    // const { navigation } = this.props; return <Register navigation={navigation}
    // />;
    
  let MainNavigator = createTabNavigator(
    {
      main: {
        screen: createDrawerNavigator({
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
      Setup: {
        screen: Setup
      },
      Preferences: {
        screen: Preferences
      },
      Shopping: {
        screen: Shopping
      },
      ShowShop: {
        screen: ShowShop
      },
      Messages: {
        screen: Messages
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
      MainNavigator = createTabNavigator(
        
        {
          
          main: {
            screen: createDrawerNavigator({
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
              Setup: {
                screen: Setup
              },
          Preferences: {
            screen: Preferences
          },
          Shopping: {
            screen: Shopping
          },
          ShowShop: {
            screen: ShowShop
          },
          Messages: {
            screen: Messages
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
