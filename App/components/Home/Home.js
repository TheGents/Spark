import _ from 'lodash';
import React, { Component } from 'react';
import { Font } from 'expo';
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
import { AppLoading } from 'expo';
// import Button from 'apsl-react-native-button';
import { Button, Avatar, Icon } from 'react-native-elements';
import Card from './Card';
import Nav from '../global-widgets/nav';
import HomeCard from './HomeCard';

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
 
  componentDidMount() {
    console.log('componentDidMount');
    axios
    .get(
      `https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture,photos,birthday,work,gender&access_token=${this.state.userToken()}`
    )
    .then(response => {

      this.setState({ user: response.data });
      // console.log('Home.js axios.get', this.state.user.facebook_auth_id)
      // console.log(this.state.user);
      // console.log(response.data);

      return axios.get(`http://localhost:3000/getHome/${this.state.user.id}`);
    })
    .then(response => {
      // console.log('sup hoe',response.data[0], this.state.user)

      if (response.data[0] === undefined) {
        console.log('componentdidmount in axios.get(getHome)', this.state.user);
        axios.post('http://localhost:3000/adduser', this.state.user)
        .then(response => {
          this.setState({ user: this.state.user });
        });

        // axios.get(`http://localhost:3000/getHome/${response.data[0].facebook_auth_id}`)
        // .then(response => {
        //   this.setState({ user: response.data[0] });
        // });

        if (this.state.user.photos.data[0].id) {
          console.log('pictures here');
              axios.get(`https://graph.facebook.com/${this.state.user.photos.data[0].id}?fields=picture&access_token=${this.state.userToken()}`)
              .then(res => {
                console.log('id', this.state.user.id);
                axios.put('http://localhost:3000/putPics', { photo1: res.data.picture, facebook_auth_id: this.state.user.id }); 
              });
            }
            if (this.state.user.photos.data[1].id) {
              axios.get(`https://graph.facebook.com/${this.state.user.photos.data[1].id}?fields=picture&access_token=${this.state.userToken()}`)
              .then(res => {
                console.log('2', res.data.picture);
                axios.put('http://localhost:3000/putPics', { photo2: res.data.picture, facebook_auth_id: this.state.user.id }); 
              });
              }
            if (this.state.user.photos.data[2].id) {
              axios.get(`https://graph.facebook.com/${this.state.user.photos.data[2].id}?fields=picture&access_token=${this.state.userToken()}`)
              .then(res => {
                console.log(res.data.picture);
                axios.put('http://localhost:3000/putPics', { photo3: res.data.picture, facebook_auth_id: this.state.user.id }); 
              });
              
            }
            if (this.state.user.photos.data[3].id) {
              axios.get(`https://graph.facebook.com/${this.state.user.photos.data[3].id}?fields=picture&access_token=${this.state.userToken()}`)
              .then(res => {
                console.log('4', res.data.picture);
                axios.put('http://localhost:3000/putPics', { photo4: res.data.picture, facebook_auth_id: this.state.user.id }); 
              });
              }
              console.log('before post', this.state.user);
        
      }
      else { 
        axios.get(`http://localhost:3000/getHome/${response.data[0].facebook_auth_id}`)
    .then(resp => {
      this.setState({ user: resp.data[0] });
    });
  }
  })
}
                  // axios.post(`https://graph.facebook.com/${this.state.user
                  // .facebook_auth_id}/picture?type=large`)


  render() {
    console.log('render');
    // if (_.isLength(this.state.user)) {
    //   return <AppLoading />;
    // }

    let onPressProps;

    if (this.state.isOnPressing) {
      onPressProps = styles.buttonStylePressing;
    } else {
      onPressProps = styles.buttonStyle1;
    }
    const { container, nameStyle, ageStyle } = styles;
    const { height, width } = Dimensions.get('window');

    return (
      <View style={container}>
        <ScrollView>
          <View style={styles.nav}>
            <Text style={styles.titleText} />
            <Image
              source={require('../images/sparkLogo.png')}
              name="ios-chatboxes-outline"
              size={25}
              style={{ width: 150, height: 40, margin: 10, marginRight: 25 }}
            />
            <Icon
              onPress={() => {
                this.props.navigation.navigate('Shopping', { user: this.state.user });
              }}
              name={'ios-flash'}
              type={'ionicon'}
              color={'#03A9F4'}
              underlayColor={'white'}
              iconStyle={{ marginRight: 10 }}
              size={40}
            />
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
              width={330}
              height={330}
            />
          </View>
          <HomeCard style={styles.homecardStyling}>
            <Text style={nameStyle}>{this.state.user.first_name}</Text>
            <Text style={ageStyle}>{this.state.user.age}</Text>
            <Text>{this.state.user.occupation}</Text>
            <Text>{this.state.user.school}</Text>
          </HomeCard>
          <View style={styles.buttonContainer}>
            <TouchableHighlight>
              <View>
                <Icon
                  onPress={() => {
                    this.props.navigation.navigate('Setup', { user: this.state.user });
                  }}
                  name={'ios-create'}
                  type={'ionicon'}
                  color={'#009FF2'}

                  underlayColor={'white'}
                  reverse
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View>
                <Icon
                  onPress={() => {
                    this.props.navigation.navigate('Preferences', { user: this.state.user });
                  }}
                  name={'md-settings'}
                  type={'ionicon'}
                  color={'#009FF2'}
                  underlayColor={'white'}
                  reverse
                />
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  nav: {
    height: 70,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
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
  contentContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  titleText: {
    width: 50
  },
  homecardStyling: {
    marginTop: 20
  }
});

export default Home;
