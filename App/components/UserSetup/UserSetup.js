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
import SetupImage from './SetupImages.js';
import SetupBio from './SetupBio.js';

const {height, width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 5;

class Setup extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        scrollX: new Animated.Value(0),
      };
      this._pickImage = this._pickImage.bind(this);
      this.renderItem = this.renderItem.bind(this);

    }

    renderItem(item, i, gent) {
      let { image, photo, third } = this.state;
      console.log('image', this.state);
      gent[i] = new Animated.Value(0);
      console.log('gent', i);
      let inputRange = [
        (i - 2) * ITEM_SIZE,
        (i - 1) * ITEM_SIZE,
        i * ITEM_SIZE,
        (i + 1) * ITEM_SIZE
      ];
      console.log('retunr', i)
      // Ensure that we're leaving space for first and last item.
      
      console.log('inside', i)
      if(i===0){ 
        return (
          <SetupImage inputRange={inputRange} ImagePicker={this._pickImage} scrollX={this.state.scrollX} gent={gent} images={ {image, photo, third }} index={i} />
        );
      }
      else if ( i === 1) {
        return(
          <SetupBio inputRange={inputRange} ImagePicker={this._pickImage} scrollX={this.state.scrollX} gent={gent} images={ {image, photo, third }} index={i} />
        );
      }
      
      
    }
    
    
    render() {
  
      return (
        <Animated.ScrollView
        style={{ flex: 0.65, width: width, paddingTop: BAR_HEIGHT * 0.6 }}
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexGrow: 1
        }}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={ITEM_SIZE}
        scrollEventThrottle={16}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
          { useNativeDriver: true }
        )}>

        {ITEMS.map((item, i) => {
          const gent = {};
          return this.renderItem(item, i, gent);
        })
        }
      </Animated.ScrollView>
      );
    }
     _pickImage = async (val) => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        });

        console.log(result);

      if (!result.cancelled) {
        if(val === 'first' ) {
          this.setState({ image: result.uri });
          console.log(result);
        }
        else if(val === 'second') {
          this.setState({ photo: result.uri });
        } 
        else if(val === 'third') {
          this.setState({ third: result.uri });
        } 
      }
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
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e'
    },
    shadow: {
      shadowOpacity: 0.4,
      shadowOffset: {
        width: 1,
        height: 3
      },
      shadowRadius: 6
    },
    headerShadow: {
      shadowOpacity: 0.6,
      shadowColor: 'blue',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 12
    }
  };

export default Setup;
