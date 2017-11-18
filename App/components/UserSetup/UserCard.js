import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const UserCard = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'red',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5 * responseWidth,
    marginRight: 5 * responseWidth,
    marginTop: 1,
    marginBottom: 20 * responseHeight,
    padding: 1
  }
}

export default UserCard;
