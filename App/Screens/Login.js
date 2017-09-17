import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';


class Login extends React.Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
    //removeItem will allow you to signup again!
    //AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Profile');
    }
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

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(Login);
