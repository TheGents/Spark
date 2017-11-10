import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { AppLoading } from 'expo';


class Login extends React.Component {
  //We recieve state from auth_payload in auth_reducer.js. If token is defined, user is logged in.
  componentDidMount() {
    //removeItem will allow you to signup again!
    // AsyncStorage.removeItem('fb_token').then( () => {
    //   this.props.facebookLogin();
    //   tthis.onAuthComplete(this.props);
    // })
    //AsyncStorage.removeItem('fb_token');
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  // componentWillReceiveProps is a lifecycle method that is called just when a component 
  // is about to rerender. It is capturing the case when a user successfully logs in. 
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    console.log('props in auth', props);
    if (props.token) {
      //Home
      // console.log('onAuthComplete')
      this.props.navigation.navigate('Home', { userToken: props.token });
    }
  }

  render() {
    return (
      <View>
       Login Screen
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
