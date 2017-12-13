'use strict';
import React, { Component } from 'react';
import { ImagePicker, LinearGradient } from 'expo';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
  Easing,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import SetupImage from './SetupImages.js';
import SetupBio from './SetupBio.js';

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);
const ITEM_SIZE = width * 0.68;
// const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
// const BAR_HEIGHT = Constants.statusBarHeight * 1;

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      user: props.navigation.state.params.user,
      value: ''
    };
    this._pickImage = this._pickImage.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.dismiss = this.dismiss.bind(this);
    console.log('user in setup', props.navigation.state.params.user);
  }
  componentWillReceiveProps(nextProps) {
    console.log('this is next props in preference', nextProps.navigation.state.params.user);
    this.setState({ user: nextProps.navigation.state.params.user });
  }

  handleChangeValue = (a, b, c) => {
    // console.log('d', this.state.value);
    // this.setState({ value: e.target.value });
    axios
    .put('http://webspark.herokuapp.com/putBio', {
      general_bio: a,
      facebook_auth_id: b,
      occupation: c
    })
    .then(response => {
      this.setState({ user: response.data[0] })
    })
  };

  _pickImage = async val => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (result.cancelled) {
      return;
    }
    const imageUri = `data:image/jpg;base64,${result.base64}`;
    const localUri = result.uri;
    console.log('this is result', result);
    const filename = localUri.split('/').pop();
    console.log('filename is', filename);
    const match = /\.(\w+)$/.exec(filename);
    console.log('match', match);
    const type = match ? `image/${match[1]}` : 'image';
    console.log('type', type);

    const formData = new FormData();

    formData.append('photo', { uri: localUri, name: filename, type });

    if (!result.cancelled) {
      if (val === 'first') {
        this.setState({ image: result.uri });
        axios
          .put('http://webspark.herokuapp.com/putPics', {
            photo1: imageUri,
            facebook_auth_id: this.state.user.facebook_auth_id
          })
          .then(response => console.log(response.data.photo1));
      } else if (val === 'second') {
        this.setState({ photo: result.uri });
        axios
          .put('http://webspark.herokuapp.com/putPics', {
            photo2: imageUri,
            facebook_auth_id: this.state.user.facebook_auth_id
          })
          .then(response => console.log(response.data.photo2));
      } else if (val === 'third') {
        this.setState({ third: imageUri });
        axios
          .put('http://webspark.herokuapp.com/putPics', {
            photo3: imageUri,
            facebook_auth_id: this.state.user.facebook_auth_id
          })
          .then(response => console.log(response.data.photo3));
      } else {
        this.setState({ fourth: result.uri });
        axios
          .put('http://webspark.herokuapp.com/putPics', {
            photo4: imageUri,
            facebook_auth_id: this.state.user.facebook_auth_id
          })
          .then(response => console.log(response.data.photo4));
      }
    }
    console.log('the facebook id', result.uri);
  };

  dismiss = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('Home', { setupUser: this.state.user });
  }

  // Ensure that we're leaving space for first and last item.

  render() {
    const { image, photo, third, fourth } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position" style={{ alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
          <LinearGradient
          // colors={['#ffffff', '#fffffd', '#dddfdd']}
          colors={['#91c1ef', '#91c1ed', '#9ac1ed']}
          style={styles.nav}
          >
          <TouchableOpacity
            style={{ width: 80 * responseWidth }}
            onPress={() => {
              this.dismiss();
            }}
          >  
            <Icon
               name={'ios-arrow-back'}
              type={'ionicon'}
              color={'inherent'}
              underlayColor={'#34799b'}
              iconStyle={{ 
                color: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 1 }}
              size={40 * responseHeight}
            />
            </TouchableOpacity>
              <Text style={{ fontSize: 22 * responseHeight, backgroundColor: 'rgba(0,0,0,0.0)', color: 'white', fontWeight: '600' }}>Profile</Text>
              <Text style={{ width: 80 * responseWidth, backgroundColor: 'rgba(0,0,0,0.0)' }}>{''}</Text>
            </LinearGradient>
          </View>
          </TouchableWithoutFeedback>
          <ScrollView style={styles.scrollViewStyle}>
          <View style={{ flex: 1 }}>
            <SetupImage
              key={1}
              ImagePicker={this._pickImage}
              images={{ image, photo, third, fourth }}
              user={this.state.user}
            />
          </View>
          <View style={styles.bioStyle}>
            <SetupBio
              key={1}
              /* ImagePicker={this._pickImage} */
              handleChangeValue={this.handleChangeValue}
              user={this.state.user}
              style={styles.bioStyle}
            />
          </View>
          <View style={styles.massiveHeight}>
            <Text>{''}</Text>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nav: {
    height: height / 8.114,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10 * responseHeight,
    borderBottomWidth: 1 * responseHeight,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    // backgroundColor: 'rgba(9,9,9,0.1)',
  },
  bioStyle: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 15 * (height / 677)
  },
  scrollViewStyle: {
    flex: 1
  },
  massiveHeight: {
    height: 260 * (height / 677)
  }
});

export default Setup;
