import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import Button from 'apsl-react-native-button';

console.ignoredYellowBox = ['Remote debugger'];

class PrefButtons extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      isOnPressing: false
    };
  }

  render() {
    var onPressProps;
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
          onPress={() => console.log('Logout')}
        >
          <View style={styles.customViewStyle}>
            <Text style={{ fontFamily: 'Avenir' }}>Logout</Text>
          </View>
        </Button>
        <Button
          style={styles.buttonStyle8}
          textStyle={styles.textStyle8}
          onPress={() => console.log('Delete Account')}
        >
          <View style={styles.customViewStyle}>
            <Text style={{ textAlign: 'center', fontFamily: 'Avenir' }}>
              Delete Account
            </Text>
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
    bottom: '10%',
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black'
  },
  buttonStyle8: {
    backgroundColor: 'white',
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 22
  },
  textStyle8: {
    width: 200,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: '#333'
  },
  customViewStyle: {
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PrefButtons;
