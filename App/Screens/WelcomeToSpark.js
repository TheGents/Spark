import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';


const SLIDE_DATA = [
    { text: 'Welcome to Spark', color: '#03A9F4' },
    { text: 'A Place for Modern Dating', color: '#009688' },
    { text: 'Swipe Away', color: '#03A9F4' }
  ];

  class WelcomeScreen extends Component {
    state = { token: null }
  
    async componentWillMount() {
      let token = await AsyncStorage.getItem('fb_token');
      console.log(token);
      if (token) {
        this.props.navigation.navigate('map');
        this.setState({ token });
      } else {
        this.setState({ token: false });
      }
    }
  
    onSlidesComplete = () => {
      this.props.navigation.navigate('Register');
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
