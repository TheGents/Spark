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
  TouchableHighlight
} from 'react-native';
import axios from 'axios';
import { AppLoading, Constants, Location, Permissions } from 'expo';
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
      this._getLocationAsync();
    }
  }

  componentDidMount() {
    axios
      .get(
        `https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large),photos,birthday,work,gender&access_token=${this.state.userToken()}`
      )
      .then(response => {
        this.setState({ user: response.data });
        console.log('this is the first response.data', this.state.city);
        return axios.get(`http://webspark.herokuapp.com/getHome/${this.state.user.id}`)
        .catch(res => {
          console.log('this is the new res', res);
        });
      })
      .then(res => {
        axios.put('http://webspark.herokuapp.com/putLocation', { location: this.state.location, numLocation: this.state.numLocation, facebook_auth_id: this.state.user.id }); 
        console.log('this is the response.data', this.state.location);
        if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[0] && this.state.user.photos.data[0].id) {
          
          axios.get(`https://graph.facebook.com/${this.state.user.photos.data[0].id}?fields=source&access_token=${this.state.userToken()}`)
          .then(res => {
            
            axios.put('http://webspark.herokuapp.com/putPics', { photo1: res.data.source, facebook_auth_id: this.state.user.id }); 
            
          });
        }
        if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[1]) {
          
          axios.get(`https://graph.facebook.com/${this.state.user.photos.data[1].id}?fields=source&access_token=${this.state.userToken()}`)
          .then(res => {
            
            axios.put('http://webspark.herokuapp.com/putPics', { photo2: res.data.source, facebook_auth_id: this.state.user.id }); 
          });
          }
        if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[2] && this.state.user.photos.data[2].id) {
          axios.get(`https://graph.facebook.com/${this.state.user.photos.data[2].id}?fields=source&access_token=${this.state.userToken()}`)
          .then(res => {
            axios.put('http://webspark.herokuapp.com/putPics', { photo3: res.data.source, facebook_auth_id: this.state.user.id }); 
          });
        }
        if (this.state.user.photos && this.state.user.photos.data && this.state.user.photos.data[3] && this.state.user.photos.data[3].id) {
          axios.get(`https://graph.facebook.com/${this.state.user.photos.data[3].id}?fields=source&access_token=${this.state.userToken()}`)
          .then(res => {
            axios.put('http://webspark.herokuapp.com/putPics', { photo4: res.data.source, facebook_auth_id: this.state.user.id }); 
          });
          }
         
        
        if (res.data[0] === undefined) {
          return axios.post('http://webspark.herokuapp.com/adduser', this.state.user);
          
        }
        return axios.get(`http://webspark.herokuapp.com/getHome/${res.data[0].facebook_auth_id}`);
      })
      .then(res => {
        this.setState({ user: res.data[0], homeLoaded: true });
      });
      console.log('this is where it is at', this.state.city)
      
    //we call this.setState when we want to update what a component shows
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.setupUser) {
    this.setState({ user: nextProps.navigation.state.params.setupUser });
    console.log('changing the user', this.state.user);
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
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('latitude', location);
    console.log('longitude', location.coords.longitude);
    
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyBKu6v30uE0db0TvQnua4G8kQHGufGHbTQ`)
    .then(response => {
      console.log('response', response.data.results[0].address_components[3].long_name);
      console.log('user is', location.coords.latitude + location.coords.longitude );
      
      this.setState({ location: response.data.results[0].address_components[3].long_name, numLocation: location.coords.latitude + location.coords.longitude });
      console.log(this.state.location);
    });
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
              size={25}
              style={{ width: 130, height: 40, margin: 10 }}
            />
            <TouchableOpacity
            style={{ width: 80, alignItems: 'flex-end'}}
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
                size={50}
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
                    this.props.navigation.navigate('Preferences', { user: this.state.user, agePreference: this.state.agePreference });
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
    marginTop: 25,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  titleText: {
    width: 80,
    marginLeft: 10
  },
  homecardStyling: {
    marginTop: 20
  }
});

export default Home;
