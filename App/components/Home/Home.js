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
  View,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';
import { Constants, Location, Permissions } from 'expo';
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
      user: '', 
      // location: props.navigation.state.params.userLocation,
      agePreference: [18, 60],
      locationPreference: 10,
      location: null,
      numLocation: null,
      errorMessage: null,
      city: null
    };
  }
 
  componentWillMount() {
    console.log(Location.getCurrentPositionAsync({}));
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      console.log('componentwillmount user is', this.state.user);
      console.log('height and width', height, width);
      console.log('size ', height * width);
      this._getLocationAsync();
    }
  }

  componentDidMount() {
    console.log('this is location in componentdidmout', this.state.location);
    axios
      .get(
        `https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large),photos,birthday,work,gender&access_token=${this.state.userToken()}`
      )
      .then(response => {
        this.setState({ user: response.data });
        console.log('this is the first response.data', this.state.location);
        return axios.get(`http://webspark.herokuapp.com/getHome/${this.state.user.id}`)
        .catch(res => {
          console.log('this is the new res', res);
        });
      })
      .then(res => {
        console.log('this.state.user');
        if (res.data[0]) {
          console.log('double success', this.state.user);
          
              console.log('id', this.state.user.id);
              if (this.state.user.photos && this.state.user.photos.data[0].id) {
                console.log('this.state.user.photos.data[0].i', this.state.user.id);
                axios.get(`https://graph.facebook.com/${this.state.user.photos.data[0].id}?fields=source&access_token=${this.state.userToken()}`)
                .then(response => {
                  axios.put('http://webspark.herokuapp.com/putPics', { photo1: response.data.source, facebook_auth_id: this.state.user.facebook_auth_id }); 
                  console.log('response.data.source', response.data.source);
                  console.log('response.data.source', this.state.user.photos.data[1]);
                });
              }
              if (this.state.user.photos && this.state.user.photos.data[0].id) {
            
                axios.get(`https://graph.facebook.com/${this.state.user.photos.data[1].id}?fields=source&access_token=${this.state.userToken()}`)
                .then(response => {
                  
                  axios.put('http://webspark.herokuapp.com/putPics', { photo2: response.data.source, facebook_auth_id: this.state.user.facebook_auth_id }); 
                });
                }
              if (this.state.user.photos && this.state.user.photos.data[2].id) {
                axios.get(`https://graph.facebook.com/${this.state.user.photos.data[2].id}?fields=source&access_token=${this.state.userToken()}`)
                .then(response => {
                  axios.put('http://webspark.herokuapp.com/putPics', { photo3: response.data.source, facebook_auth_id: this.state.user.facebook_auth_id }); 
                });
              }
              if (this.state.user.photos && this.state.user.photos.data[3].id) {
                axios.get(`https://graph.facebook.com/${this.state.user.photos.data[3].id}?fields=source&access_token=${this.state.userToken()}`)
                .then(response => {
                  axios.put('http://webspark.herokuapp.com/putPics', { photo4: response.data.source, facebook_auth_id: this.state.user.facebook_auth_id }); 
                });  
            }
          
          this.setState({ user: res.data[0], homeLoaded: true });
        }
        else if (res.data[0] === undefined) {
          console.log('adding new user', this.state.numLocation);
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.location.coords.latitude},${this.state.location.coords.longitude}&key=AIzaSyBKu6v30uE0db0TvQnua4G8kQHGufGHbTQ`)
          .then(response => {
            console.log('city', response.data.results[0].address_components[3].long_name);
            this.setState({ location: response.data.results[0].address_components[3].long_name });
            console.log('setting current location in componentdidmount', this.state.user);
            this.setState({ homeLoaded: true });
            axios.post('http://webspark.herokuapp.com/adduser', { user: this.state.user, location: response.data.results[0].address_components[3].long_name, numLocation: this.state.numLocation });
            return axios.get(`http://webspark.herokuapp.com/getHome/${this.state.user.id}`)
            .then(responses => {
              this.setState({ user: responses.data[0], homeLoaded: true });
              // console.log('setState city', this.state.location);
              // console.log('setState score', this.state.numLocation);
              // console.log('setState id', this.state.user.id);
            });
          });
          if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[0] && this.state.user.photos.data[0].id) {
            console.log('in the second .then at home.js', this.state.user.id);
            axios.get(`https://graph.facebook.com/${this.state.user.photos.data[0].id}?fields=source&access_token=${this.state.userToken()}`)
            .then(response => {
              console.log('in the third .then at home.js');
              axios.put('http://webspark.herokuapp.com/putPics', { photo1: response.data.source, facebook_auth_id: this.state.user.id }); 
              console.log('in the fourth .then at home.js', this.state.user.facebook_auth_id);
            });
          }
          if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[1]) {
            
            axios.get(`https://graph.facebook.com/${this.state.user.photos.data[1].id}?fields=source&access_token=${this.state.userToken()}`)
            .then(response => {
              
              axios.put('http://webspark.herokuapp.com/putPics', { photo2: response.data.source, facebook_auth_id: this.state.user.id }); 
            });
            }
          if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[2] && this.state.user.photos.data[2].id) {
            axios.get(`https://graph.facebook.com/${this.state.user.photos.data[2].id}?fields=source&access_token=${this.state.userToken()}`)
            .then(response => {
              axios.put('http://webspark.herokuapp.com/putPics', { photo3: response.data.source, facebook_auth_id: this.state.user.id }); 
            });
          }
          if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[3] && this.state.user.photos.data[3].id) {
            axios.get(`https://graph.facebook.com/${this.state.user.photos.data[3].id}?fields=source&access_token=${this.state.userToken()}`)
            .then(response => {
              axios.put('http://webspark.herokuapp.com/putPics', { photo4: response.data.source, facebook_auth_id: this.state.user.id }); 
            });
            }
          // return axios.put('http://webspark.herokuapp.com/putLocation', { location: this.state.location, numLocation: this.state.numLocation, facebook_auth_id: this.state.user.facebook_auth_id });
        }
        
        console.log('in the first .then at home.js', this.state.user.id);
        console.log('in the first .then at home.js', this.state.user.facebook_auth_id);
        
        });
    //we call this.setState when we want to update what a component shows
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.setupUser) {
    this.setState({ user: nextProps.navigation.state.params.setupUser });
    }
    if (nextProps.navigation.state.params.agePreference) {
      this.setState({ agePreference: nextProps.navigation.state.params.agePreference });
    }
    if (nextProps.navigation.state.params.locationPreference) {
      this.setState({ locationPreference: nextProps.navigation.state.params.locationPreference });
    }
   
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('_getLocationAsync this is the status', status);
    if (status !== 'granted') {
      console.log('not granted');
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log('latitude', location.coords);
    // console.log('longitude', location.coords.longitude);
    this.setState({ numLocation: location.coords.latitude + location.coords.longitude, location });
    console.log('numLocation after setstate', this.state.numLocation);
    // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyBKu6v30uE0db0TvQnua4G8kQHGufGHbTQ`)
    // .then(response => {
    //   console.log('city', response.data.results[0].address_components[3].long_name);
    //   console.log('locationscore in get request', location.coords.latitude + location.coords.longitude );
    //   console.log('this is the user id', this.state.user);
    //   axios.put('http://webspark.herokuapp.com/putLocation', { location: response.data.results[0].address_components[3].long_name, numLocation: location.coords.latitude + location.coords.longitude, facebook_auth_id: this.state.user.id });
    //   this.setState({ location: response.data.results[0].address_components[3].long_name, numLocation: location.coords.latitude + location.coords.longitude });
    //   console.log('setting current location', this.state.location);
    // });
  };

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
          <View style={styles.nav}>
            <Text style={styles.titleText} />
            <Image
              source={require('../images/sparkLogo.png')}
              resizeMode="contain"
              name="ios-chatboxes-outline"
              size={25 * (width / 375)}
              style={{ width: 130 * (width / 375), height: height / 16.675, margin: 10 }}
            />
            <TouchableOpacity
            style={{ width: 80 * (width / 375), alignItems: 'flex-end' }}
            onPress={() => {
                  this.props.navigation.navigate('Shopping', { user: this.state.user, agePreference: this.state.agePreference, locationPreference: this.state.locationPreference });
                }}
            >
              <Icon
                name={'ios-flash'}
                type={'ionicon'}
                color={'#34799b'}
                underlayColor={'white'}
                iconStyle={{ marginRight: 10 }}
                size={50 * (height / 667)}
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
              activeOpacity={0.7}
              width={280 * (height / 677)}
              height={280 * (height / 677)}
            />
          </View>
          <HomeCard style={styles.homecardStyling}>
            <Text style={nameStyle}>{this.state.user.first_name}, {this.state.user.age}</Text>
            <Text style={ageStyle}>{ this.state.user.occupation}</Text>
            <Text style={ageStyle}>{this.state.user.school}</Text>
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
                  size={37 * (height / 667)}
                  underlayColor={'white'}
                  reverse
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View> 
                <Icon
                  onPress={() => {
                    this.props.navigation.navigate('Preferences', { user: this.state.user, agePreference: this.state.agePreference });
                  }}
                  size={37 * (height / 667)}
                  name={'md-settings'}
                  type={'ionicon'}
                  color={'#34799b'}
                  underlayColor={'white'}
                  reverse
                />
              </View>
            </TouchableHighlight>
          </View>
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
    height: height / 8.114,
    flexDirection: 'row',
    paddingTop: 10 * (height / 667),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  nameStyle: {
    fontSize: 23 * (height / 667),
    fontWeight: '400'
  },
  ageStyle: {
    fontSize: 21 * (height / 667),
    fontWeight: '300',
    marginBottom: -2
  },
  contentContainerStyle: {
    backgroundColor: 'white',
    height: 1.1 * ( height / 2.382 ),
    marginTop: 35 * (height / 667),
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 27 * (height / 677)
  },
  titleText: {
    width: width / 4.6875,
    marginLeft: 10 
  },
  homecardStyling: {
    marginTop: 3 * (height / 677)
  }
});

export default Home;
