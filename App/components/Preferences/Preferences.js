'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PrefSliders from './PrefSliders';
import PrefButtons from './PrefButtons';

class Preferences extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View  style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <Image source = {require('../images/suit.png')} style = {{width:25, height:25, margin:10}}/>
          </TouchableOpacity>
          <Image source ={require('../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
          <View style = {{width:25, height:25, margin:10}}/>
          </View>
        <PrefSliders />
        <PrefButtons />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
  }
});

export default Preferences;
