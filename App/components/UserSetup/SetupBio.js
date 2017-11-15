import React, { Component } from 'react';
import { Constants } from 'expo';
import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
  Switch,
  Easing,
  ScrollView
} from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;

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
      .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        this.setState({
          general_bio: response.data[0].general_bio,
          occupation: response.data[0].occupation
        });
        // console.log(this.state);
      });
  }
  updateBio(general_bio) {
    console.log('here', general_bio);
    this.setState({ general_bio: general_bio })
    this.props.handleChangeValue(general_bio, this.props.user.facebook_auth_id, this.state.occupation);
  }
  updateOccupation(occupation) {
    console.log('here', occupation);
    this.setState({ occupation: occupation })
    this.props.handleChangeValue(this.state.bio, this.props.user.facebook_auth_id, occupation);
  }
  render() {
    const { general_bio, occupation, height } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
        <Text style={styles.textStyle}>Bio</Text>
          <ScrollView
            scrollEnabled={false}
          >
          <TextInput
            multiline
            placeholder="About me"
            maxLength={250}
            numberOfLines={5}
            onChangeText={(general_bio) => this.updateBio(general_bio)}
            value={this.state.general_bio}
            style={{ ...styles.bioTextInput }}
            backgroundColor={'transparent'}
            editable
          />
          </ScrollView>
          <Text style={styles.textStyle}>Occupation</Text>
          <TextInput
            placeholder="Work"
            maxLength={35}
            numberOfLines={1}
            onChangeText={(occupation) => this.updateOccupation(occupation)}
            value={this.state.occupation}
            style={{ ...styles.occupationTextInput }}
            backgroundColor={'transparent'}
            editable
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
    fontSize: 29 * (height / 677),
    fontWeight: '400'
  },
  ageStyle: {
    fontSize: 19 * (height / 677),
    fontWeight: '400'
  },
  textInput: {
    fontSize: 29 * (height / 677),
    fontWeight: '400',
    borderWidth: 1 * (height / 677),
  },
  textStyle: {
    fontSize: 20 * (height / 677), 
    marginLeft: 5, 
    marginTop: 7, 
    color: '#34799b',
  },
  bottomContainer: {
    flex: 1,
    bottom: 0,
    width: '100%'
  },
  bioTextInput: {
    marginTop: 1,
    fontSize: 20 * (height / 677),
    fontWeight: '400',
    borderTopWidth: 1 * (height / 677),
    borderBottomWidth: 1 * (height / 677),
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    padding: 5 * (width / 357),
    height: 100 * (height / 677)
  },
  occupationTextInput: {
    marginTop: 1,
    fontSize: 20 * (height / 677),
    fontWeight: '400',
    borderTopWidth: 1 * (height / 677),
    borderBottomWidth: 1 * (height / 677),
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 5 * (width / 357),
    maxHeight: 50 * (height / 677),
  }
};

export default SetupBio;
