import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AppLoading, Location, Constants, Permissions } from 'expo';
import Slides from '../components/Slides';


const SLIDE_DATA = [
    { text: 'Welcome to Spark', color: 'white' },
    { text: 'Find Your Match!', color: 'white' },
    // { text: 'Guys Message First!', color: 'white' },
    { text: 'Girls Rate the Guys!', color: 'white' },
    { text: null, color: 'white' }
  ];

  const setParamsAction = NavigationActions.setParams({
    params: { userToken: 'Hello', user: null },
    key: 'Home',
  },
  {
    params: { user: null },
    key: 'Preferences',
  });

  class WelcomeScreen extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        token: null,
        logout: null
      };
    }
  
    async componentWillMount() {
      // if (Platform.OS === 'android' && !Constants.isDevice) {
      //   this.setState({
      //     errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      //   });
      // } else {
      //   this._getLocationAsync();
      // }
      this.props.navigation.dispatch(setParamsAction);
      console.log('we are in welcomescreen componentwillmount', this.props.navigation.state.params);
      let token = await AsyncStorage.getItem('fb_token');
      console.log('token is', await AsyncStorage.getItem('fb_token'));
      // console.log("token from async storage", token)
      if (token) {
        //Home
        this.props.navigation.navigate('Home', { userToken: token });
        this.setState({ token });
 
      } else {
        this.setState({ token: false });
      }
    }
    
    componentWillReceiveProps(nextProps) {
      console.log('nextProps in welcome to spark', nextProps.navigation.state.params);
      if (nextProps.navigation.state.params.logout) {
        console.log('nextProps.navigation.state.params.logout', nextProps.navigation.state.params.logout);
        this.setState({ logout: nextProps.navigation.state.params.logout });
      }
    }
    // _getLocationAsync = async () => {
    //   let { status } = await Permissios.askAsync(Permissions.LOCATION);
    //   if (status !== 'granted') {
    //     this.setState({
    //       errorMessage: 'Permission to access location was denied',
    //     });
    //   }
  
    //   let location = await Location.getCurrentPositionAsync({});
    //   console.log('this is location', location)
    //   this.setState({ location });
    // };

    onSlidesComplete = () => {
      //On Clicking Button on Last Slide, We Either Go to Home Screen or Facebook Login
      if (this.state.logout) {
        console.log('onSlidesComplete logout');
        this.props.navigation.navigate('auth', { logout: 'ok' });
      }
      this.props.navigation.navigate('auth');
    }
  
    render() {
      console.log('render in welcome');
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
