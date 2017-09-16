'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrefSliders from './PrefSliders';
import PrefButtons from './PrefButtons';

class UserPreferences extends Component {
  render() {
    return (
      <View style={styles.container}>
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

export default UserPreferences;
