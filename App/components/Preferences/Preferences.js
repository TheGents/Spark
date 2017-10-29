'use strict';

import React, { Component } from 'react';
import { LoginManager } from 'react-native-fbsdk';
import { View, Text, StyleSheet, AlertIOS, AsyncStorage, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Axios from 'axios';
import PrefSliders from './PrefSliders';
import PrefButtons from './PrefButtons';
import Privacy from './Privacy';
// import TermsOfService from './TermsOfService';

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agePreference: props.navigation.state.params.agePreference,
      user: props.navigation.state.params.user
    };
    this.logout = this.logout.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    console.log(this.state.user);
  }
  
  logout = async (val) => {
    await AsyncStorage.removeItem('fb_token');
    AlertIOS.alert('You Have Been Logged Out');
    this.props.navigation.navigate(val);
  }
  delete = async (val) => {
    console.log('in ths delete', this.state.user.id);
    Axios.delete(`http://webspark.herokuapp.com/deleteUserAccount/${this.state.user.id}`).then((res) => {
      console.log('in delete', res);
      AsyncStorage.removeItem('fb_token');
      AlertIOS.alert('You Have Been Logged Out');
      this.props.navigation.navigate(val);
    });
  }

  handleChangeValue = (val) => {
      this.setState({ agePreference: val });
      console.log('age pref', this.state.user.facebook_auth_id);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Home', { agePreference: this.state.agePreference });
            }}
            name={'ios-home'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 }}
          />
          <Image
            source={require('../images/sparkLogo.png')}
            resizeMode="contain"
            style={{ width: 100, height: 30 }}
          />
          <Text>{'      '}</Text>
        </View>
        <View style={{ width: 25, height: 25, margin: 10 }} />
        <View style={styles.sliderStyles}>
          <PrefSliders 
          handleChangeValue={this.handleChangeValue}
          />
        </View>
        <PrefButtons logout={this.logout} delete={this.delete} />
        <View style={styles.privacyAndTerms}>
          <View style={styles.borderPrivacy}>
            <Privacy />
          </View>
          <View style={styles.borderTerms}>
            {/* <Text
              style={styles.textLegalese}
              onPress={() => {
                this.props.navigation.navigate('TermsOfService');
              }}
            >
              Terms of Service
            </Text> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    flex: 1
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  nav: {
    height: 70,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  privacyAndTerms: {
    flex: 1,
    // justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  borderPrivacy: {
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%'
  },
  borderTerms: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  textLegalese: {
    color: 'gray',
    marginLeft: 10,
    marginTop: 10,
    height: 30
  },
  sliderStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%'
  }
});

export default Preferences;
