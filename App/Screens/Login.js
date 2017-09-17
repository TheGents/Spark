import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';


class Login extends React.Component {
  componentDidMount() {
    this.props.facebookLogin();
    //removeItem will allow you to signup again!
    AsyncStorage.removeItem('fb_token');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Spark!</Text>
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

export default connect(null, actions)(Login);
