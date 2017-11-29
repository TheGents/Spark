import React, { Component } from 'react';
import { Constants } from 'expo';
import {
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native';
import axios from 'axios';

console.disableYellowBox = true;

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);
const ITEM_SIZE = 100;

const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 1;

class SetupImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo1: props.user.photo1 || '',
      photo2: props.user.photo2 || '',
      photo3: props.user.photo3 || '',
      photo4: props.user.photo4 || ''
    };
  }
  componentDidMount() {
    axios
      .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo1);
        if (response.data[0].photo1) {
          this.setState({ photo1: response.data[0].photo1 });
        }
        console.log(this.state.photo1);
      });
   
    axios
      .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo2);
        if (response.data[0].photo2) {
          this.setState({ photo2: response.data[0].photo2 });
          console.log(this.state.photo2);
        }
      });
    axios
      .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo3);
        if (response.data[0].photo3) {
          this.setState({ photo3: response.data[0].photo3 });
          console.log(this.state.photo3);
        }
      });
    axios
      .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
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
        .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          if (response.data[0].photo1) {
            this.setState({ photo1: response.data[0].photo1 });
          }
        });
    } else if (val == 'second') {
      axios
        .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          if (response.data[0].photo2) {
            this.setState({ photo2: response.data[0].photo2 });
          }
        });
    } else if (val == 'third') {
      axios
        .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          if (response.data[0].photo3) {
            this.setState({ photo3: response.data[0].photo3 });
          }
        });
    } else {
      axios
        .get(`http://webspark.herokuapp.com/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          if (response.data[0].photo4) {
            this.setState({ photo4: response.data[0].photo4 });
          }
        });
    }
  }

  render() {
    const { image, photo, third, fourth } = this.props.images;
    const firstLogo = image || this.state.photo1 ? require('../images/deletelogo.png') : require('../images/add.png')
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
              style={{ height: 30 * responseHeight, width: 30 * responseWidth }}
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
            style={{ height: 30 * responseHeight, width: 30 * responseWidth }}
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
            style={{ height: 30 * responseHeight, width: 30 * responseWidth }}
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
            style={{ height: 30 * responseHeight, width: 30 * responseWidth }}
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
