import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView
} from 'react-native';
import Button from 'apsl-react-native-button';
import Card from './Card';
import Nav from '../global-widgets/nav';

console.ignoredYellowBox = ['Remote debugger'];
let { height, width } = Dimensions.get('window');

// after registering, settings link/pref settings link/profile setup link

class Home extends Component {
  constructor(props) {
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
    const { container, nameStyle, ageStyle } = styles;
    let { height, width } = Dimensions.get('window');

    return (
      <ScrollView style={container}>
        <View  style={styles.nav}>
          <Image source ={require('../images/logo.png')} resizeMode = "contain" style={{ width: 100, height: 30 }} />
        <TouchableOpacity 
          onPress={() => {
          this.props.navigation.navigate('Shopping');
          }}
        >
      <Image source ={require('../images/suit.png')} name="ios-chatboxes-outline" color ="#555" size={25} style={{width:30, height:30, margin:10}} />
      </TouchableOpacity>
      </View>
        <Image
          source={require('../../images/player-vs-gentleman.jpg')}
          resizeMode="stretch"
          style={{ height: 350, width: '100%' }}
        />
        <Card>
          <Text style={nameStyle}>First Name</Text>
          <Text style={ageStyle}>23</Text>
          <Text>Occupation</Text>
          <Text>Education</Text>
        </Card>
        <Button
          style={styles.buttonStyle5}
          textStyle={styles.textStyle}
          onPress={() => {
            this.props.navigation.navigate('Shopping');
          }}
        >
          Shopping
        </Button>
        <Button
          style={styles.buttonStyle5}
          textStyle={styles.textStyle}
          onPress={() => {
            this.props.navigation.navigate('Setup');
          }}
        >
          Profile Setup
        </Button>
        <Button
          style={styles.buttonStyle5}
          textStyle={styles.textStyle}
          onPress={() => {
            this.props.navigation.navigate('Preferences');
          }}
        >
          Preference Settings
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nav: {
    height:60,
    flexDirection:'row',
    paddingTop:10,
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  },
  nameStyle: {
    fontSize: 19,
    fontWeight: '400'
  },
  ageStyle: {
    fontSize: 21,
    fontWeight: '300',
    marginBottom: -2
  },
  textStyle: {
    color: 'white'
  },
  buttonStyle5: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db',
    height: 35,
    marginLeft: 30,
    marginRight: 30
  },
  customViewStyle: {
    width: 120,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default Home;
