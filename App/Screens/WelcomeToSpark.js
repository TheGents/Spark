import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';


const SLIDE_DATA = [
    { text: 'Welcome to Spark', color: '#223d5a' },
    { text: 'A Place for Modern Dating', color: '#009688' },
    { text: 'Swipe Away', color: '#b5b8bf' }
  ];

  class WelcomeScreen extends Component {
    state = { token: null }
  
    async componentWillMount() {
      let token = await AsyncStorage.getItem('fb_token');
      console.log('token is', token);
      if (token) {
        //Home
        this.props.navigation.navigate('Home', { userToken: token });
        this.setState({ token });
      } else {
        this.setState({ token: false });
        this.props.navigation.navigate('Home', { userToken: 'token' });
      }
    }
  
    onSlidesComplete = () => {
      //On Clicking Button on Last Slide, We Either Go to Home Screen or Facebook Login
      this.props.navigation.navigate('Home');
    }
  
    render() {
      if (_.isNull(this.state.token)) {
        return <AppLoading />;
      }
  
      return (
        //onComplete is a method button taken from Slides.js which brings user to login screen
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      );
    }
  }
  
  export default WelcomeScreen;  
