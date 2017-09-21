import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const Privacy = () => (
  <View style={styles.container}>
    <Text
      style={{ color: 'gray' }}
      onPress={() =>
        Linking.openURL('https://termsfeed.com/privacy-policy/9a7bb3100733d69b15346a792e6c7282')}
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
    marginBottom: 5
  }
});

export default Privacy;
