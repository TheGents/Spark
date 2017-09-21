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
import {
  SharedElement,
  SharedElementGroup
} from '@expo/ex-navigation';
import ITEMS from './data';
import Card from './UserCard';
import BioCard from './BioCard'

const {height, width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 5;

class SetupBio extends Component {
    constructor(props) {
      super(props);
      this.state = {
        general_bio: '',
      }
    }
    componentDidUpdate() {
      console.log(this.state.general_bio)
    }  
    render() {
        const { nameStyle, borderStyle, ageStyle } = styles;
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
                    <View> 
                    
                    <Card>
                        <Text style={nameStyle}>Name</Text>
                        <Text style={ageStyle}>23</Text>
                        <Text>Occupation</Text>
                        <Text>Education</Text>
                    </Card>
                    <View style={borderStyle}>
                      <Text>Bio</Text>
                      <BioCard >
                      <TextInput style={{height:50}}
                      multiline = {true}
                      maxLength = {250}
                      numberOfLines = {5}
                      onChangeText={(general_bio) => this.setState({ general_bio })}
                      value={this.state.general_bio}
                      style={styles.textInput}
                      />
                      </BioCard>
                    </View>
                    <Card>
                      <Switch></Switch>
                    </Card>
                   
                    
                    </View>
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
            nameStyle: {
                fontSize: 29,
                fontWeight: '400'
                },
            borderStyle: {
                borderWidth: 1,
                borderRadius: 2,
                borderBottomColor: 'green',
            },      
            ageStyle: {
                fontSize: 19,
                fontWeight: '400'
                },    
            textInput: {
                fontSize: 19,
                fontWeight: '400',
                height: 90  
                }       
        }
    };
            export default SetupBio;
