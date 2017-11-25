import React from 'react';
import { View, Text, Dimensions, StyleSheet, Linking } from 'react-native';

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);

const Privacy = () => (
  <View style={styles.container}>
    <Text
      style={styles.textStyle}
      onPress={() =>
        Linking.openURL('https://webspark.herokuapp.com/')}
    >
      Privacy Policy
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
    // height: 30
  }, 
  textStyle: {
    color: 'gray', 
    marginVertical: 5,
    fontSize: 14 * responseHeight
  }
});

export default Privacy;
