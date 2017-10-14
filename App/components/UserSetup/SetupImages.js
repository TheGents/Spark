import React, { Component } from 'react';
import { ImagePicker, Constants } from 'expo';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { SharedElement, SharedElementGroup } from '@expo/ex-navigation';
import axios from 'axios';
import ITEMS from './data';
import Card from './UserCard';

console.disableYellowBox = true;

const { height, width } = Dimensions.get('window');
const ITEM_SIZE = 100;

const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 1;

class SetupImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo1: '',
      photo2: '',
      photo3: '',
      photo4: ''
    };
  }
  componentDidMount() {
    axios
      .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo1);
        if (response.data[0].photo1) {
          this.setState({ photo1: response.data[0].photo1 });
        }
        console.log(this.state.photo1);
      });
    axios
      .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo2);
        if (response.data[0].photo2) {
          this.setState({ photo2: response.data[0].photo2 });
          console.log(this.state.photo2);
        }
      });
    axios
      .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo3);
        if (response.data[0].photo3) {
          this.setState({ photo3: response.data[0].photo3 });
          console.log(this.state.photo3);
        }
      });
    axios
      .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo2);
        if (response.data[0].photo2) {
          this.setState({ photo2: response.data[0].photo2 });
          console.log(this.state.photo2);
        }
      });
    axios
      .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo3);
        if (response.data[0].photo3) {
          this.setState({ photo3: response.data[0].photo3 });
          console.log(this.state.photo3);
        }
      });
    axios
      .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo4);
        if (response.data[0].photo4) {
          this.setState({ photo4: response.data[0].photo4 });
          console.log(this.state.photo4);
        }
      });
  }

  onClick(val) {
    this.props.ImagePicker(val);
    if (val == 'first') {
      axios
        .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          console.log('this is what i need', response.data[0].photo1);
          if (response.data[0].photo1) {
            this.setState({ photo1: response.data[0].photo1 });
          }
        });
    } else if (val == 'second') {
      axios
        .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          console.log('this is what i need', response.data[0].photo1);
          if (response.data[0].photo2) {
            this.setState({ photo2: response.data[0].photo2 });
          }
        });
    } else if (val == 'third') {
      axios
        .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          console.log('this is what i need', response.data[0].photo1);
          if (response.data[0].photo3) {
            this.setState({ photo3: response.data[0].photo3 });
          }
        });
    } else {
      axios
        .get(`https://mobilespark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          console.log('this is what i need', response.data[0].photo1);
          if (response.data[0].photo4) {
            this.setState({ photo4: response.data[0].photo4 });
          }
        });
    }
  }

  render() {
    const { image, photo, third, fourth } = this.props.images;
    console.log('third', this.state.photo3);
    const firstLogo = image || this.state.photo1  ? require('../images/deletelogo.png') : require('../images/add.png')
    const secondLogo = photo || this.state.photo2 ? require('../images/deletelogo.png') : require('../images/add.png')
    const thirdLogo = third || this.state.photo3 ? require('../images/deletelogo.png') : require('../images/add.png')
    const fourthLogo = fourth || this.state.photo4 ? require('../images/deletelogo.png') : require('../images/add.png')
    
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.onClick('first');
          }}
        >
          <Animated.Image 
          source={{ uri: image || this.state.photo1 }} 
          style={styles.box}>
            <Image
              source={firstLogo}
              style={{ height: 30, width: 30 }}
            />
          </Animated.Image>  
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onClick('second');
          }}
        >
          <Animated.Image 
          source={{ uri: photo || this.state.photo2 }} 
          style={styles.box}
          >
            <Image
            source={secondLogo}
            style={{ height: 30, width: 30 }}
            />
          </Animated.Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onClick('third');
          }}
        >
          <Animated.Image source={{ uri: third || this.state.photo3 }} style={styles.box}>
            <Image
            source={thirdLogo}
            style={{ height: 30, width: 30 }}
            />
           </Animated.Image> 
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onClick('fourth');
          }}
        >
          <Animated.Image 
          source={{ uri: fourth || this.state.photo4 }} 
          style={styles.box} 
          >
            <Image
            source={fourthLogo}
            style={{ height: 30, width: 30 }}
            />
          </Animated.Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    marginTop: 5,
  },
  box: {
    flex: 1,
    margin: 2,
    width: width / 2 - 6,
    height: width / 2 - 6,
    backgroundColor: 'rgba(52,121,155,.3)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 20,
    paddingRight: 0
  }
};

export default SetupImage;
