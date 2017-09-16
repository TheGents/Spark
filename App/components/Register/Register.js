import React from 'react';
import { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button
  } from 'react-native';

import LoginButton from './LoginButton/LoginButton.js';
import Nav from '../global-widgets/nav';
// import profile from '../Profile/profile.js'


const Register = (props) => {
    const { navigate } = props.navigation;
        return (
            <Image source={require('../../../App/images/bg.jpg')} style={styles.backgroundImage}>
            <Nav  type = "profile" onPress={() => navigate('GoShopping')} title="Go to Second Screen"/>
            <View style={styles.container}>
                
                <Text style={styles.welcome}>
                    Gents
                </Text>

                <Image source={require('../../../App/images/gents.png')} style={{width: 193, height: 200}}/>

                <Text style={styles.instructions}>
                    Date with class.
                </Text>

                <Text style={styles.instructions}>
                    Example new line,{'\n'}
                </Text>

                <LoginButton />
                
            </View>
            </Image>)
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      marginBottom: 5,
    },
  });

  export default Register;