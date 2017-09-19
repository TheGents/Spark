import React, { Component } from 'react';
import { ImagePicker } from 'expo';
import {

  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
  Button
} from 'react-native';

const {height, width} = Dimensions.get('window');

class Setup extends Component {
    state = {
      image: null,
    };
    
    render() {
      let { image } = this.state;
  
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      );
    }
  
    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };
  }

export default Setup;
