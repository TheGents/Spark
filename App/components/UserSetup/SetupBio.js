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
import axios from 'axios';

const {height, width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 5;

class SetupBio extends Component {
    constructor(props) {
      super(props);
      this.state = {
        general_bio: 'Looking for Gents',
        occupation: 'Dog Catcher'
      };
    }
    componentWillMount() {
      axios.get(`http://localhost:3000/getHome/${this.props.user.facebook_auth_id}`).then((response) => {
        this.setState({general_bio: response.data[0].general_bio, occupation: response.data[0].occupation})
        // console.log(this.state);
      })
    }  
    
    render() {

      const styles = {
        headerShadow: {
            shadowOpacity: 0.6,
            shadowColor: 'blue',
            shadowOffset: {
              width: 0,
              height: 1
            }
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
            height: 90  
            }       
    
};
        
    return (
        <View>
                      <TextInput 
                      multiline = {true}
                      maxLength = {250}
                      numberOfLines = {5}
                      onChangeText={(general_bio) => this.setState({ general_bio })}
                      value={this.state.general_bio}
                      style={{...styles.textInput, height:50}}
                      />
                      
                      <TextInput 
                      multiline = {true}
                      maxLength = {250}
                      numberOfLines = {5}
                      onChangeText={(occupation) => this.setState({ occupation })}
                      value={this.state.occupation}
                      style={{...styles.textInput, height:50}}
                      />
                      <Button
                          title='ok'
                         onPress={() => {
                          {/* console.log({general_bio: this.state.general_bio, facebook_auth_id:this.props.user.facebook_auth_id}); */}
                          axios.put('http://localhost:3000/putBio', {general_bio: this.state.general_bio, facebook_auth_id:this.props.user.facebook_auth_id, occupation: this.state.occupation}).then((response)=> console.log(response))
                        }}
                        />
                        
                    </View>
                  
  
      );
    }
}
        

            export default SetupBio;
