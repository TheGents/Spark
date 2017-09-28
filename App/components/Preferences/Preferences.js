'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import PrefSliders from './PrefSliders';
import PrefButtons from './PrefButtons';
import Privacy from './Privacy';
import TermsOfService from './TermsOfService';

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    AsyncStorage.removeItem('fb_token');
    this.props.navigation.navigate('Welcome');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
            name={'ios-home'}
            type={'ionicon'}
            color={'#03A9F4'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 }}
            size={30}
          />
          <Image
            source={require('../images/sparkLogo.png')}
            resizeMode="contain"
            style={{ width: 100, height: 40, margin: 10 }}
          />
          <Text>{'      '}</Text>
        </View>
        <View style={{ width: 25, height: 25, margin: 10 }} />
        <PrefSliders />
        <PrefButtons 
        logout={this.logout} 
        />
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
    marginTop: 5,
    marginBottom: 5
  }
});

export default Preferences;
