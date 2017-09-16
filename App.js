import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Login from './App/Screens/Login';
import store from './App/Store';


class App extends Component {
    render() {
      return (
      <Provider store={store}>
            <Login />
        </Provider>
      );
    }
  }

export default App;
