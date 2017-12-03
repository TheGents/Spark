import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import * as actions from '../Actions';


class Login extends React.Component {
  //We recieve state from auth_payload in auth_reducer.js. If token is defined, user is logged in.
  componentDidMount() {
    //removeItem will allow you to signup again!
    // AsyncStorage.removeItem('fb_token').then( () => {
    //   this.props.facebookLogin();
    //   tthis.onAuthComplete(this.props);
    // })
    //AsyncStorage.removeItem('fb_token');
    if (this.props.navigation.state.params) {
      this.props.token = null;
    }
    console.log('props in didmount', this.props);
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  // componentWillReceiveProps is a lifecycle method that is called just when a component 
  // is about to rerender. It is capturing the case when a user successfully logs in. 
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    console.log('props', props.navigation);
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   // actions: [
    //   //   NavigationActions.navigate({ routeName: 'Welcome' })
    //   // ]
    // });
    // this.props.navigation.dispatch(resetAction);
    if (props.token && props.logout) {
      //Home
      const setParamsAction = NavigationActions.setParams(
        {
          params: { user: null },
          key: 'Home',
        });
        this.props.navigation.dispatch(setParamsAction);
      console.log('props.token props.logout in login.js', props.logout, ' ', props.token);
      this.props.navigation.navigate('Home', { userToken: props.token, logout: 'ok' });
    }
    else if (props.token) {
      console.log('props.token props.logout in login.js', props.token);
      this.props.navigation.navigate('Home', { userToken: props.token });
    }
  }

  render() {
    return (
      <View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
},
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(Login);
