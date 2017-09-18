'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PrefSliders from './PrefSliders';
import PrefButtons from './PrefButtons';

class Preferences extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Image
              source={require('../images/suit.png')}
              style={{ width: 25, height: 25, margin: 10 }}
            />
          </TouchableOpacity>
          <Image
            source={require('../images/logo.png')}
            resizeMode="contain"
            style={{ width: 100, height: 30 }}
          />
        </View>
        <View style={{ width: 25, height: 25, margin: 10 }} />
        <PrefSliders />
        <PrefButtons />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    flex: 1,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  nav: {
    height: 60,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  }
});

export default Preferences;
