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
  ScrollView,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';
// import Button from 'apsl-react-native-button';
import { Button, Avatar } from 'react-native-elements';
import Card from './Card';
import Nav from '../global-widgets/nav';

console.ignoredYellowBox = ['Remote debugger'];
const { height, width } = Dimensions.get('window');

// after registering, settings link/pref settings link/profile setup link

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnPressing: false,
      userToken: () =>
        (props.navigation.state.params.userToken === 'token'
          ? 'token'
          : props.navigation.state.params.userToken),
      user: ''
    };
  }
  componentWillMount() {
    axios
      .get(
        `https://graph.facebook.com/v2.5/me?fields=email,name,friends,birthday,work,gender&access_token=${this.state.userToken()}`
      )
      .then(response => {
        this.setState({ user: response.data });
        console.log('Home.js axios.get', this.state.user.name)
        // console.log(this.state.user);
        // console.log(response.data);

        // console.log('Asyncstorage', AsyncStorage.getItem('fb_token').then(function(results){
        //   console.log(results);
        //   return results;
        // }));
        // console.log('initial shit',response.data.id)

        return axios.get(`http://localhost:3000/getHome/${this.state.user.facebook_auth_id}`);
      }).then((response)=> {

        // console.log('sup hoe',response.data[0], this.state.user)
        if (response.data[0] === undefined) {
          return axios.post('http://localhost:3000/adduser', this.state.user);
        }
        return axios.get(`http://localhost:3000/getHome/${response.data[0].facebook_auth_id}`);
      })
      .then(response => {
        console.log('Home.js', response.data[0]);
        this.setState({ user: response.data[0] });
      });
    //we call this.setState when we want to update what a component shows
  }

  render() {


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
      },
      contentContainerStyle: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
      },
      buttonParent: {
        width: 200,
         borderRadius: 5,
         marginTop: 5
      }
    });

    
    let onPressProps;

    if (this.state.isOnPressing) {
      onPressProps = styles.buttonStylePressing;
    } else {
      onPressProps = styles.buttonStyle1;
    }
    const { container, nameStyle, ageStyle } = styles;
    const { height, width } = Dimensions.get('window');

    return (
      <ScrollView style={container}>
        <View style={styles.nav}>
          <Image
            source={require('../images/logo.png')}
            resizeMode="contain"
            style={{ width: 100, height: 30 }}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Shopping', { user: this.state.user });
            }}
          >
            <Image
              source={require('../images/suit.png')}
              name="ios-chatboxes-outline"
              color="#555"
              size={25}
              style={{ width: 30, height: 30, margin: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainerStyle}>
          <Avatar
            rounded
            source={{
              uri: `https://graph.facebook.com/${this.state.user
                .facebook_auth_id}/picture?type=large`
            }}
            onPress={() => console.log('Profile pic pressed')}
            activeOpacity={0.7}
            width={250}
            height={250}
          />
        </View>
        <Card style={styles.homeCard}>
          <Text style={nameStyle}>{this.state.user.first_name}</Text>
          <Text style={ageStyle}>{this.state.user.age}</Text>
          <Text>Occupation: {this.state.user.occupation}</Text>
          <Text>Education: {this.state.user.school}</Text>
          <Text>Bio: {this.state.user.biography}</Text>
        </Card>
        <View style={styles.contentContainerStyle}>
          <TouchableHighlight style={styles.buttonParent}>
            <View>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Shopping', { user: this.state.user });
                }}
                Large
                buttonStyle={styles.button}
                // backgroundColor={socialColors.quora}
                raised
                title="Shopping"
                onpress={console.log('button pressed')}
                color="#199E8C"
                backgroundColor="#F9FBEA"
                borderRadius={15}
                underlayColor="transparent"
                width="100px"
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonParent}>
            <View>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Setup', { user: this.state.user });
                }}
                Large
                buttonStyle={styles.button}
                // backgroundColor={socialColors.quora}
                raised
                title="Profile Setup"
                onpress={console.log('button pressed')}
                color="#199E8C"
                backgroundColor="#F9FBEA"
                borderRadius={15}
                underlayColor="transparent"
                width="100px"
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonParent}>
            <View>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Preferences', { user: this.state.user });
                }}
                Large
                buttonStyle={styles.button}
                // backgroundColor={socialColors.quora}
                raised
                title="Preference Settings"
                onpress={console.log('button pressed')}
                color="#199E8C"
                backgroundColor="#F9FBEA"
                borderRadius={15}
                underlayColor="transparent"
                width="100px"
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonParent}>
            <View>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Messages', { user: this.state.user });
                }}
                Large
                buttonStyle={styles.button}
                // backgroundColor={socialColors.quora}
                raised
                title="Matches"
                onpress={console.log('button pressed')}
                color="#199E8C"
                backgroundColor="#F9FBEA"
                borderRadius={15}
                underlayColor="transparent"
                width="100px"
              />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}


export default Home;
