import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import Button from 'apsl-react-native-button';

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);

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
          onPress={() => this.props.logout('Welcome')}
        >
          <View style={styles.customViewStyle}>
            <Text style={{ fontFamily: 'Avenir', fontSize: 16 * responseHeight, }}>Logout</Text>
          </View>
        </Button>
        <Button
          style={styles.buttonStyle8}
          onPress={() => this.props.delete('Welcome')}
        >
          <View style={styles.customViewStyle}>
            <Text style={{ fontFamily: 'Avenir', fontSize: 15 * responseHeight, }}>Delete Account</Text>
          </View>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: '20%',
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 10 * responseHeight,
    marginLeft: 10 * responseHeight
    // backgroundColor: 'black'
  },
  buttonStyle8: {
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1 * responseHeight,
    borderRadius: 22 * responseHeight,
    height: 50 * responseHeight,
    width: 128 * (width / 357),
  },
  textStyle8: {
    width: 153 * responseWidth,
    borderColor: 'red',
    borderWidth: 1,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: 'white'
  },
  customViewStyle: {
    width: 128 * responseWidth,
    height: 55 * responseHeight,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PrefButtons;
