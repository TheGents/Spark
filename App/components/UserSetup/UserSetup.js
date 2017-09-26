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
import axios from 'axios'
import ITEMS from './data';
import SetupImage from './SetupImages.js';
import SetupBio from './SetupBio.js';
import Card from './UserCard';
import UserCardSection from './UserCardSection';

const {height, width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 5;

class Setup extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        scrollX: new Animated.Value(0),
        user: props.navigation.state.params.user,
        value: '',
      };
      this._pickImage = this._pickImage.bind(this);
      this.handleChange = this.handleChangeValue.bind(this);
    }

      
      // Ensure that we're leaving space for first and last item.
    
    
    render() {
      let { image, photo, third, fourth } = this.state;
      return (
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View style={styles.nav}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home') } 
            >
              <Text>Done</Text>
            </TouchableOpacity>
            <Text>Settings</Text>
          </View>
        <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <UserCardSection>
          <SetupImage key={1}  ImagePicker={this._pickImage}  images={ {image, photo, third, fourth }} user={ this.state.user } />
          <SetupBio key={2}  ImagePicker={this._pickImage} user={ this.state.user } />
      </UserCardSection>
      </ScrollView>
        </View>
      );
    }

    _pickImage = async (val) => {
            let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            });
      
            if(result.cancelled) {
              return;
            }
      
            let localUri = result.uri
            console.log('this is localUri', localUri)
            let filename = localUri.split('/').pop();
            console.log("filename is", filename)
            let match = /\.(\w+)$/.exec(filename);
            console.log('match', match)
            let type = match ? `image/${match[1]}` : 'image';
            console.log('type', type)
      
            let formData = new FormData();
    
           formData.append('photo', { uri: localUri, name: filename, type });
      
      
          if (!result.cancelled) {
            if(val === 'first' ) {
              this.setState({ image: result.uri });
              axios.put('http://localhost:3000/putPics', { photo1: localUri, facebook_auth_id: this.state.user.facebook_auth_id }).then((response)=> console.log(response.data.photo1))
            }
            else if(val === 'second') {
              this.setState({ photo: result.uri });
              axios.put('http://localhost:3000/putPics', { photo2: localUri, facebook_auth_id: this.state.user.facebook_auth_id }).then((response)=> console.log(response.data.photo2))
            } 
            else if(val === 'third') {
              this.setState({ third: result.uri });
              axios.put('http://localhost:3000/putPics', { photo3: localUri, facebook_auth_id: this.state.user.facebook_auth_id }).then((response)=> console.log(response.data.photo3))
            } 
            else{
              this.setState({ fourth: result.uri });
              axios.put('http://localhost:3000/putPics', { photo4: localUri, facebook_auth_id: this.state.user.facebook_auth_id }).then((response)=> console.log(response.data.photo4))
            }
        }
        console.log('the facebook id',result.uri)
          
          
      };

    handleChangeValue = (e) => {
      // console.log('d', this.state.value);
      this.setState({ value: e.target.value })
    };
  }

  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: BAR_HEIGHT,
      backgroundColor: '#fff'
    },
    nav: {
      height:60,
      flexDirection:'row',
      paddingTop:10,
      justifyContent: 'space-between',
      alignItems:'center',
      backgroundColor: '#fff',
      borderBottomWidth:1,
      borderColor:'rgba(0, 0, 0, 0.1)'
    }
  };

export default Setup;
