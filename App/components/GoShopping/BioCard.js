import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const BioCard = props => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderBottomWidth: 0,
    borderColor: 'red',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    padding: 1,
    flex: 1,
  }
}

export default BioCard;
