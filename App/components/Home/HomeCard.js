import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeCard = props => <View style={styles.containerStyle}>{props.children}</View>;

const styles = StyleSheet.create({
  containerStyle: {
    // borderWidth: 1,
    // borderRadius: 6,
    // borderColor: '#ddd',
    // borderBottomWidth: 1,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    padding: 2,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeCard;
