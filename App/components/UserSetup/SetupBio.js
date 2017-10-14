import React, { Component } from 'react';
import { ImagePicker, Constants } from 'expo';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
  Switch,
  Easing,
  ScrollView,
  Button
} from 'react-native';
import { SharedElement, SharedElementGroup } from '@expo/ex-navigation';
import ITEMS from './data';
import Card from './UserCard';
import BioCard from './BioCard';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 1;

class SetupBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general_bio: '',
      occupation: ''
    };
  }

  componentDidMount() {
    axios
      .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        this.setState({
          general_bio: response.data[0].general_bio,
          occupation: response.data[0].occupation
        });
        // console.log(this.state);
      });
  }

  render() {
    const { general_bio, occupation, height } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
        <Text style={{ marginLeft: 5, color: '#34799b', }}>Bio</Text>
          <TextInput
            multiline
            placeholder="About me"
            maxLength={250}
            numberOfLines={5}
            onChangeText={general_bio => this.setState({ general_bio })}
            value={this.state.general_bio}
            style={{ ...styles.bioTextInput, height: 80 }}
            backgroundColor={'transparent'}
            editable
          />
          <Text style={{ marginLeft: 5, color: '#34799b', }}>Occupation</Text>
          <TextInput
            multiline
            placeholder="Work"
            maxLength={250}
            numberOfLines={5}
            onChangeText={occupation => this.setState({ occupation })}
            value={this.state.occupation}
            style={{ ...styles.occupationTextInput, height: 40 }}
            backgroundColor={'transparent'}
            editable
          />
          <Button
            title="Save"
            style={{ height: 40 }}
            backgroundColor={'transparent'}
            onPress={() => {
              this.props.handleChangeValue(this.state.general_bio, this.props.user.facebook_auth_id, this.state.occupation);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    // bottom: 0,
    width: '100%'
  },
  nameStyle: {
    fontSize: 29,
    fontWeight: '400'
  },
  ageStyle: {
    fontSize: 19,
    fontWeight: '400'
  },
  textInput: {
    fontSize: 29,
    fontWeight: '400',
    borderWidth: 1
  },
  bottomContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  bioTextInput: {
    fontSize: 20,
    fontWeight: '400',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    paddingLeft: 5
  },
  occupationTextInput: {
    fontSize: 20,
    fontWeight: '400',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingLeft: 5
  }
};

export default SetupBio;
