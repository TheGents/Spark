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
import { Avatar } from 'react-native-elements';
import ITEMS from './data';
import BioCard from './BioCard';
import SetupImage from './MatchImage.js';
import ImageSectionCard from './ImageSectionCard';
import UserCardSection from './MatchCardSection';
const {height, width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 5;

class ShowShop extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        scrollX: new Animated.Value(0),
        match: props.navigation.state.params.user,
        value: '',
      };
      this.renderItem = this.renderItem.bind(this);
    
    }
  //   <TouchableOpacity
  //   onPress={() => {
  //     this.props.navigation.navigate('Shopping', { user: this.state.user });
  //   }}
  // >

    componentDidUpdate() {
      // console.log(this.state.value);
    }  

    renderItem(item, i, gent) {
      let { image, photo1, photo2, photo3, photo4 } = this.state.match;
      console.log('this.state.match', photo1)
      console.log(i)
      // console.log('usersetup.js', this.state.user);
      gent[i] = new Animated.Value(0);
      
      let inputRange = [
        (i - 1) * ITEM_SIZE,
        (i - 1) * ITEM_SIZE,
        i * ITEM_SIZE,
        (i + 1) * ITEM_SIZE
      ];
      
      // Ensure that we're leaving space for first and last item.
      
      
      if (i===1) { 
        return (
          <SetupImage key={i} inputRange={inputRange} scrollX={this.state.scrollX} gent={gent} images={{ image }} index={i} />
        );
      }
      else if (i === 2 && photo1) {
        return (
          <SetupImage key={i} inputRange={inputRange}  scrollX={this.state.scrollX} gent={gent} index={i} images={{ photo1 }} />
        );
      }
      else if (i === 3 && photo2) {
        return (
          <SetupImage key={i} inputRange={inputRange}  scrollX={this.state.scrollX} gent={gent} index={i} images={{ photo2 }} />
        );
      }
      else if (i === 4 && photo3) {
        return (
          <SetupImage key={i} inputRange={inputRange}  scrollX={this.state.scrollX} gent={gent} index={i} images={{ photo3 }} />
        );
      }
      else if (i === 5 && photo4) {
        return (
          <SetupImage key={i} inputRange={inputRange}  scrollX={this.state.scrollX} gent={gent} index={i} images={{ photo4 }} />
        );
      }
      
      
    }
    
    
    render() {
  
      return (
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Shopping') } 
          >
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor: 'white', flex: 2}}>
        <ImageSectionCard>
        <Animated.ScrollView
        horizontal={true}
        decelerationRate={0}
        snapToInterval={313}
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
      </ImageSectionCard>
      <UserCardSection>
        <BioCard>
          <Text>{this.state.match.first_name}</Text>
          <Text>{this.state.match.age}</Text>
          <Text>Occupation: {this.state.match.occupation}</Text>
          <Text>Education: {this.state.match.school}</Text>
          <Text>Bio: {this.state.match.general_bio}</Text>
        </BioCard>
      </UserCardSection>
      </ScrollView>
        </View>
      );
    }


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

export default ShowShop;
