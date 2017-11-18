'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, AlertIOS, TouchableOpacity, Dimensions, AsyncStorage, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Axios from 'axios';
import PrefSliders from './PrefSliders';
import PrefButtons from './PrefButtons';
import Privacy from './Privacy';
import TermsOfService from './TermsOfService';

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);

const setParamsAction = NavigationActions.setParams(
  {
    params: { user: null },
    key: 'Preferences',
  });

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agePreference: props.navigation.state.params.agePreference,
      locationPreference: props.navigation.state.params.locationPreference,
      user: props.navigation.state.params.user
    };
    this.logout = this.logout.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleLocationValue = this.handleLocationValue.bind(this);
    console.log('user age in preferences', this.state.user.age);
  }

  componentWillReceiveProps(nextProps) {
    console.log('this is next props in preference', nextProps.navigation.state.params.user);
    this.setState({ user: nextProps.navigation.state.params.user });
  }
  
  logout = async (val) => {
    AsyncStorage.removeItem('fb_token', (err) => console.log('finished', err));
    this.props.navigation.dispatch(setParamsAction);
    this.props.navigation.navigate('Welcome', { logout: 'logout' });
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
  handleLocationValue = (val) => {
    this.setState({ locationPreference: val });
    console.log('location pref', val);
}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
        <TouchableOpacity
            style={{ width: 80 * responseWidth, alignItems: 'flex-start' }}
            onPress={() => {
              this.props.navigation.navigate('Home', { agePreference: this.state.agePreference, locationPreference: this.state.locationPreference, user: this.state.user });
            }}
        >    
          <Icon
            name={'ios-home'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 * responseWidth }}
            size={40 * responseHeight}
          />
        </TouchableOpacity>  
          <Image
            source={require('../images/sparkLogo.png')}
            resizeMode="contain"
            style={{ width: 100 * responseWidth, height: 30 * responseHeight }}
          />
          <Text style={{ width: 80 * responseWidth, marginRight: 10 * responseWidth}}>{'      '}</Text>
        </View>
        <View style={{ width: 25 * responseHeight, height: 25 * responseHeight, margin: 10 * responseHeight }} />
        <View style={styles.sliderStyles}>
          <PrefSliders 
          handleChangeValue={this.handleChangeValue}
          handleLocationValue={this.handleLocationValue}
          />
        </View>
        <PrefButtons logout={this.logout} delete={this.delete} />
        <View style={styles.privacyAndTerms}>
          <View style={styles.borderPrivacy}>
            <Privacy />
          </View>
          <View style={styles.borderTerms}>
            <Text
              style={styles.textLegalese}
              onPress={() => {
                this.props.navigation.navigate('TermsOfService');
              }}
            >
              Terms of Service
            </Text>
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
    height: height / 8.114,
    flexDirection: 'row',
    paddingTop: 10 * responseHeight,
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
    marginLeft: 10 * responseHeight,
    marginTop: 10 * responseHeight,
    height: 30 * responseHeight
  },
  sliderStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%'
  }
});

export default Preferences;
