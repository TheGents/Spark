import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const Privacy = () => (
  <View style={styles.container}>
    <Text
      style={{ color: 'gray', marginVertical: 5 }}
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
    height: 30
  }
});

export default Privacy;
