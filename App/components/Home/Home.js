import _ from 'lodash';
import React, { Component } from 'react';
import { Font } from 'expo';
import {
  StyleSheet,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  View,
  ActivityIndicator,
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
      homeLoaded: false,
      userToken: () =>
        (props.navigation.state.params.userToken === 'token'
          ? 'token'
          : props.navigation.state.params.userToken),  
      user: props.navigation.state.params.setupUser || ''
    };
  }
 
  componentDidMount() {
    console.log('this is the big one', this.state.user);
    axios
      .get(
        `https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture.type(large),photos,birthday,work,gender&access_token=${this.state.userToken()}`
      )
      .then(response => {
        this.setState({ user: response.data });

        return axios.get(`http://localhost:3000/getHome/${this.state.user.id}`);
      })
      .then(res => {
        if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[0] && this.state.user.photos.data[0].id) {
          
          axios.get(`https://graph.facebook.com/${this.state.user.photos.data[0].id}?fields=source&access_token=${this.state.userToken()}`)
          .then(res => {
            
            axios.put('http://localhost:3000/putPics', { photo1: res.data.source, facebook_auth_id: this.state.user.id }); 
            
          });
        }
        if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[1]) {
          
          axios.get(`https://graph.facebook.com/${this.state.user.photos.data[1].id}?fields=source&access_token=${this.state.userToken()}`)
          .then(res => {
            
            axios.put('http://localhost:3000/putPics', { photo2: res.data.source, facebook_auth_id: this.state.user.id }); 
          });
          }
        if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[2] && this.state.user.photos.data[2].id) {
          axios.get(`https://graph.facebook.com/${this.state.user.photos.data[2].id}?fields=source&access_token=${this.state.userToken()}`)
          .then(res => {
            axios.put('http://localhost:3000/putPics', { photo3: res.data.source, facebook_auth_id: this.state.user.id }); 
          });
        }
        if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[3] && this.state.user.photos.data[3].id) {
          axios.get(`https://graph.facebook.com/${this.state.user.photos.data[3].id}?fields=source&access_token=${this.state.userToken()}`)
          .then(res => {
            axios.put('http://localhost:3000/putPics', { photo4: res.data.source, facebook_auth_id: this.state.user.id }); 
          });
          }
        // console.log('sup hoe',response.data[0], this.state.user)
        
        if (res.data[0] === undefined) {
          return axios.post('http://localhost:3000/adduser', this.state.user);
          
        }
        return axios.get(`http://localhost:3000/getHome/${res.data[0].facebook_auth_id}`);
      })
      .then(res => {
        this.setState({ user: res.data[0], homeLoaded: true });
      });
    //we call this.setState when we want to update what a component shows
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.navigation.state.params.setupUser });
  }

  render() {
    if (!this.state.homeLoaded) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#34799b' />
        </View>
      );
    }

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
              color={'#34799b'}
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
              width={280}
              height={280}
            />
          </View>
          <HomeCard style={styles.homecardStyling}>
            <Text style={nameStyle}>{this.state.user.first_name}</Text>
            <Text style={ageStyle}>{this.state.user.age}</Text>
            <Text>{ this.state.user.occupation}</Text>
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
                  color={'#34799b'}

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
                  color={'#34799b'}
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
  loading: {
    flex: 1,
    justifyContent: 'center'
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
