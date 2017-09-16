import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import Login from './App/Screens/Login';
import store from './App/Store';

import WelcomeScreen from './App/Screens/WelcomeToSpark';


class App extends Component {
    render() {
      const MainNavigator = TabNavigator({
        welcome: { screen: WelcomeScreen },
        auth: { screen: Login }
      }, {
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
