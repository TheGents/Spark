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
  Button
} from 'react-native';
import { SharedElement, SharedElementGroup } from '@expo/ex-navigation';
import axios from 'axios';
import ITEMS from './data';
import Card from './UserCard';


const {height, width} = Dimensions.get('window');
const ITEM_SIZE = 100;

const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 5;

class SetupImage extends Component {
  constructor(props) {
       super(props);
        this.state = {
          photo1: '../images/bond.jpeg',
          photo2: '../images/bond.jpeg',
          photo3: '../images/bond.jpeg',
          photo4: '../images/bond.jpeg',
        };
      }
        componentWillMount() {
          axios.get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`).then((response) => {
            console.log('this is what i need',response.data[0].photo1);
            if(response.data[0].photo1){
              this.setState({photo1: response.data[0].photo1 });
            }
            console.log(this.state.photo1)
          });
          axios.get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`).then((response) => {
            console.log('this is what i need',response.data[0].photo2);
            if(response.data[0].photo2){
            this.setState({photo2: response.data[0].photo2 });
            console.log(this.state.photo2)
            }
        });
        axios.get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`).then((response) => {
          console.log('this is what i need',response.data[0].photo3);
          if(response.data[0].photo3){
          this.setState({photo3: response.data[0].photo3 });
          console.log(this.state.photo3)
          }
      });
    axios
      .get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo2);
        if (response.data[0].photo2) {
          this.setState({ photo2: response.data[0].photo2 });
          console.log(this.state.photo2);
        }
      });
    axios
      .get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo3);
        if (response.data[0].photo3) {
          this.setState({ photo3: response.data[0].photo3 });
          console.log(this.state.photo3);
        }
      });
    axios
      .get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`)
      .then(response => {
        console.log('this is what i need', response.data[0].photo4);
        if (response.data[0].photo4) {
          this.setState({ photo4: response.data[0].photo4 });
          console.log(this.state.photo4);
        }
      });
  }

  render() {
    const { image, photo, third, fourth } = this.props.images;

    return (

       
                  <View>
                    
                    <TouchableOpacity onPress={ () => { this.onClick('first') }}>
                    <Animated.Image
                      key={image}
                      source={{ uri: image || this.state.photo1 }} style={{ width: 200, height: 200 }}
                      style={[
                        {
                          height: ITEM_SIZE,
                          width: ITEM_SIZE / 1.06,
                          borderRadius: ITEM_SIZE / 2.2,
                          backgroundColor: 'rgba(52, 52, 52, 0.2)',
                        }
                      ]}
                    />
                    </TouchableOpacity>
                   
                 
                    <TouchableOpacity onPress={ () => { this.onClick('second') }}>
                    <Animated.Image
                      source={{ uri: photo ||this.state.photo2 }} style={{ width: 200, height: 200 }}
                      style={[
                        {
                          height: ITEM_SIZE,
                          width: ITEM_SIZE / 1.06,
                          borderRadius: ITEM_SIZE / 2.2,
                          backgroundColor: 'rgba(52, 52, 52, 0.1)'
                        }
                      ]}
                    />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={ () => { this.onClick('third') }}>
                    <Animated.Image
                      source={{ uri: third ||this.state.photo3 }} style={{ width: 200, height: 200 }}
                      style={[
                        {
                          height: ITEM_SIZE,
                          width: ITEM_SIZE / 1.06,
                          borderRadius: ITEM_SIZE / 2.2,
                          backgroundColor: 'rgba(52, 52, 52, 0.8)'
                        }
                      ]}
                    />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={ () => { this.onClick('fourth') }}>
                    <Animated.Image
                      source={{ uri: fourth ||this.state.photo4 }} style={{ width: 200, height: 200 }}
                      style={[
                        {
                          height: ITEM_SIZE,
                          width: ITEM_SIZE / 1.06,
                          borderRadius: ITEM_SIZE / 2.2,
                          backgroundColor: 'rgba(52, 52, 52, 0.8)'
                        }
                      ]}
                    />
                    </TouchableOpacity>
                   
                  </View>
                
      );
    }


  onClick(val) {
    this.props.ImagePicker(val);
    if (val == 'first') {
      axios
        .get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          console.log('this is what i need', response.data[0].photo1);
          this.setState({ photo1: response.data[0].photo1 });
        });
    } else if (val == 'second') {
      axios
        .get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          console.log('this is what i need', response.data[0].photo1);
          this.setState({ photo2: response.data[0].photo2 });
        });
    } else if (val == 'third') {
      axios
        .get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          console.log('this is what i need', response.data[0].photo1);
          this.setState({ photo3: response.data[0].photo3 });
        });
    } else {
      axios
        .get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`)
        .then(response => {
          console.log('this is what i need', response.data[0].photo1);
          this.setState({ photo4: response.data[0].photo4 });
        });
    }
  }
}

const styles = {
  headerShadow: {
    shadowOpacity: 0.6,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 1
    }
  }
};
export default SetupImage;
