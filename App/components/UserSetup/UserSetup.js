import React, { Component } from 'react';
import { ImagePicker, Constants } from 'expo';
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
  Button,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SharedElement, SharedElementGroup } from '@expo/ex-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import axios from 'axios';
import ITEMS from './data';
import SetupImage from './SetupImages.js';
import SetupBio from './SetupBio.js';
import Card from './UserCard';
import UserCardSection from './UserCardSection';

const { height, width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 1;

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
  }
  componentDidUpdate() {
    console.log('updating', this.state.user);
  }

  handleChangeValue = (a, b, c) => {
    // console.log('d', this.state.value);
    // this.setState({ value: e.target.value });
    axios
    .put('http://mobilespark.herokuapp.com/putBio', {
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
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (result.cancelled) {
      return;
    }

    const localUri = result.uri;
    console.log('this is localUri', localUri);
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
          .put('http://mobilespark.herokuapp.com/putPics', {
            photo1: localUri,
            facebook_auth_id: this.state.user.facebook_auth_id
          })
          .then(response => console.log(response.data.photo1));
      } else if (val === 'second') {
        this.setState({ photo: result.uri });
        axios
          .put('http://mobilespark.herokuapp.com/putPics', {
            photo2: localUri,
            facebook_auth_id: this.state.user.facebook_auth_id
          })
          .then(response => console.log(response.data.photo2));
      } else if (val === 'third') {
        this.setState({ third: result.uri });
        axios
          .put('http://mobilespark.herokuapp.com/putPics', {
            photo3: localUri,
            facebook_auth_id: this.state.user.facebook_auth_id
          })
          .then(response => console.log(response.data.photo3));
      } else {
        this.setState({ fourth: result.uri });
        axios
          .put('http://mobilespark.herokuapp.com/putPics', {
            photo4: localUri,
            facebook_auth_id: this.state.user.facebook_auth_id
          })
          .then(response => console.log(response.data.photo4));
      }
    }
    console.log('the facebook id', result.uri);
  };

  // Ensure that we're leaving space for first and last item.

  render() {
    const { image, photo, third, fourth } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.nav}>
            <Icon
              onPress={() => {
                this.props.navigation.navigate('Home', { setupUser: this.state.user });
              }}
              name={'ios-home'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              iconStyle={{ marginLeft: 10 }}
              size={30}
            />
            {/* <Text>Settings</Text> */}
            <Image
              source={require('../images/sparkLogo.png')}
              resizeMode="contain"
              style={{ width: 100, height: 40, margin: 10 }}
            />
            <Text>{'          '}</Text>
          </View>
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
              key={2}
              ImagePicker={this._pickImage}
              handleChangeValue={this.handleChangeValue}
              user={this.state.user}
              style={styles.bioStyle}
            />
          </View>
          <View style={styles.massiveHeight}>
            <Text>{''}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  nav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  bioStyle: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 195
  },
  scrollViewStyle: {
    flex: 1
  },
  massiveHeight: {
    height: 260
  }
};

export default Setup;
