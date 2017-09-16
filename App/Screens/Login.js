import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';
import * as actions from '../Actions';
import store from '../Store';


class Login extends React.Component {
  componentDidMount() {
    this.props.facebookLogin();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>AuthScreen!</Text>
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
});

export default connect(null, actions)(Login);
