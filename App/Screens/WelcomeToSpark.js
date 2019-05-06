import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { AppLoading, Location, Constants, Permissions } from 'expo';
import Slides from '../components/Slides';
import Terms from './Terms';


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
  const resetAction = StackActions.reset({
    index: 0,
    // actions: [
    //   NavigationActions.navigate({ routeName: 'Welcome' })
    // ]
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
      console.log('alert', Alert);

      // if (Platform.OS === 'android' && !Constants.isDevice) {
      //   this.setState({
      //     errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      //   });
      // } else {
      //   this._getLocationAsync();
      // }
      this.props.navigation.dispatch(resetAction);
      console.log('we are in welcomescreen componentwillmount', this.props.navigation.state.params);
      console.log('nav in welcome', this.props.navigation);
      let token = await AsyncStorage.getItem('fb_token');
      console.log('token is', await AsyncStorage.getItem('fb_token'));
      // console.log("token from async storage", token)
      if (token) {
        //Home
        this.props.navigation.navigate('Home', { userToken: token });
        this.setState({ token });
 
      } else {
        Alert.alert(
          'End-User License Agreement for Dallas Spark',
          Terms.terms,
          [
            { text: 'Continue', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
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
      if (this.props.navigation.state.params) {
        console.log('onSlidesComplete logout');
        this.props.navigation.navigate('auth', { delete: 'ok' });
      }
      console.log('onSlidesComplete nav', this.props.navigation);
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
