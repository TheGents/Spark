import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import Button from 'apsl-react-native-button';

const { height, width } = Dimensions.get('window');

console.ignoredYellowBox = ['Remote debugger'];

class PrefButtons extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      isOnPressing: false
    };
  }

  render() {
    let onPressProps;
    if (this.state.isOnPressing) {
      onPressProps = styles.buttonStylePressing;
    } else {
      onPressProps = styles.buttonStyle1;
    }

    return (
      <View style={styles.container}>
        <Button
          style={styles.buttonStyle8}
          textStyle={styles.textStyle8}
          onPress={() => this.props.logout('Welcome')}
        >
          <View style={styles.customViewStyle}>
            <Text style={{ fontFamily: 'Avenir', fontSize: 19 * (height / 667), }}>Logout</Text>
          </View>
        </Button>
        <Button
          style={styles.buttonStyle8}
          textStyle={styles.textStyle8}
          onPress={() => this.props.delete('Welcome')}
        >
          <View style={styles.customViewStyle}>
            <Text style={{ textAlign: 'center', fontFamily: 'Avenir', fontSize: 19 * (height / 667), }}>Delete Account</Text>
          </View>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
    position: 'absolute',
    right: 0,
    bottom: '20%',
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around'
    // backgroundColor: 'black'
  },
  buttonStyle8: {
    backgroundColor: 'white',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 22 * (height / 667),
    height: 50 * (height / 667),
    width: 115 * (width / 357),
  },
  textStyle8: {
    width: 150 * (width / 375),
    borderColor: 'red',
    borderWidth: 1,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: 'white'
  },
  customViewStyle: {
    fontSize: 24 * (height / 667),
    width: 115 * (width / 375),
    height: 55 * (height / 667),
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PrefButtons;
