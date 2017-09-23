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
import {
  SharedElement,
  SharedElementGroup
} from '@expo/ex-navigation';
import ITEMS from './data';
import Card from './UserCard';
import axios from 'axios';

const {height, width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
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
        this.setState({photo1: response.data[0].photo1})
        console.log(this.state.photo1)
      });
    }
    render() {
        const { image, photo, third, fourth } = this.props.images; 
        
        console.log('this is the image', image)
    return (
       
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: this.props.scrollX.interpolate({
                      inputRange: this.props.inputRange,
                      outputRange: [0.7, 1, 0.7, 1],
                      extrapolate: 'clamp'
                    })
                  },
                  {
                    translateY: this.props.gent[this.props.index].interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [-200, 0, 200]
                    })
                  }
                ]
              }
            ]}>
            
              <SharedElement id="image">
                {animation => (
                  <Animated.View
                    style={[
                      styles.headerShadow,
                      {
                        shadowRadius: 15,
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.2,
                        height: ITEM_SIZE,
                        width: ITEM_SIZE,
                        borderRadius: ITEM_SIZE / 2,
                        backgroundColor: 'transparent',
                        marginVertical: 10,
                        transform: [
                          //Here we curve the carousel
                          {
                            translateY: this.props.scrollX.interpolate({
                              inputRange: this.props.inputRange,
                              outputRange: [-ITEM_SIZE / 2, 0, -ITEM_SIZE / 2, 0],
                              extrapolate: 'clamp'
                            })
                          }
                        ]
                      },
                      animation
                    ]}>
                    <Card>
                    
                    <TouchableOpacity onPress={ () => { this.props.ImagePicker('first') }}>
                    <Animated.Image
                      key={image}
                      source={{ uri: this.state.photo1 }} style={{ width: 200, height: 200 }}
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
                    </Card>
                    <Card>
                    <TouchableOpacity onPress={ () => { this.props.ImagePicker('second') }}>
                    <Animated.Image
                      source={{ uri: photo }} style={{ width: 200, height: 200 }}
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
                    </Card>
                    <Card>
                    <TouchableOpacity onPress={ () => { this.props.ImagePicker('third') }}>
                    <Animated.Image
                      source={{ uri: third }} style={{ width: 200, height: 200 }}
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
                    </Card>
                    <Card>
                    <TouchableOpacity onPress={ () => { this.props.ImagePicker('fourth') }}>
                    <Animated.Image
                      source={{ uri: fourth }} style={{ width: 200, height: 200 }}
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
                   </Card>
                  </Animated.View>
                )}
              </SharedElement>
            
          </Animated.View>
        
      );
    }
}
        

        const styles = {
            headerShadow: {
                shadowOpacity: 0.6,
                shadowColor: 'blue',
                shadowOffset: {
                  width: 0,
                  height: 1
                },
        }
    }
            export default SetupImage;