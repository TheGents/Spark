import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  View,
  ScrollView
} from 'react-native';
import axios from 'axios';
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
      isOnPressing: false,
      userToken: () => props.navigation.state.params.userToken==='token' ? 'token' : props.navigation.state.params.userToken,
      user: ''
    };
  }
  componentWillMount() {

    axios.get(`https://graph.facebook.com/v2.5/me?fields=email,name,friends,birthday,work&access_token=${this.state.userToken()}`)
      .then(response => {
        this.setState({ user: response.data });
        // console.log(this.state.user);
        // console.log(response.data);
        
        // console.log('Asyncstorage', AsyncStorage.getItem('fb_token').then(function(results){
        //   console.log(results);
        //   return results;
        // }));
        // console.log('initial shit',response.data.id)
        return axios.get(`http://localhost:3000/getHome/${this.state.user.id}`);
      }).then((response)=> {
        // console.log('sup hoe',response.data[0], this.state.user)
        if(response.data[0] === undefined) {
          return axios.post(`http://localhost:3000/adduser`, this.state.user)
        }
        return axios.get(`http://localhost:3000/getHome/${response.data[0].facebook_auth_id}`);
      }).then((response)=> {
        console.log('Home.js',response.data[0]);
        this.setState({ user: response.data[0] })
      })
      //we call this.setState when we want to update what a component shows
    
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
          this.props.navigation.navigate('Shopping', { user :this.state.user });
          }}
        >
      <Image source ={require('../images/suit.png')} name="ios-chatboxes-outline" color ="#555" size={25} style={{width:30, height:30, margin:10}} />
      </TouchableOpacity>
      </View>
        <Image
          source={{uri:'https://graph.facebook.com/' + this.state.user.facebook_auth_id + '/picture?type=large'}}
          resizeMode="stretch"
          style={{ height: 350, width: '100%' }}
        />
        <Card>
          <Text style={nameStyle}>{this.state.user.first_name}</Text>
          <Text style={ageStyle}>{this.state.user.age}</Text>
          <Text>Occupation: {this.state.user.occupation}</Text>
          <Text>Education: {this.state.user.school}</Text>
        </Card>
        <Button
          style={styles.buttonStyle5}
          textStyle={styles.textStyle}
          onPress={() => {
            this.props.navigation.navigate('Shopping', { user :this.state.user });
          }}
        >
          Shopping
        </Button>
        <Button
          style={styles.buttonStyle5}
          textStyle={styles.textStyle}
          onPress={() => {
            this.props.navigation.navigate('Setup', { user :this.state.user });
          }}
        >
          Profile Setup
        </Button>
        <Button
          style={styles.buttonStyle5}
          textStyle={styles.textStyle}
          onPress={() => {
            this.props.navigation.navigate('Preferences', { user :this.state.user });
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
