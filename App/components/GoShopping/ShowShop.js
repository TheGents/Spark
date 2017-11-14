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
import { Avatar, Icon } from 'react-native-elements';
import ITEMS from './data';
import SetupImage from './MatchImage.js';
import ImageSectionCard from './ImageSectionCard';
import BioCardSection from './BioCardSection';
const {height, width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 1;

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

  componentWillReceiveProps(nextProps) {
    this.setState({ match: nextProps.navigation.state.params.user });
  }

    renderItem(item, i, gent) {
      let { image, photo1, photo2, photo3, photo4 } = this.state.match;
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
          <SetupImage key={i} inputRange={inputRange} scrollX={this.state.scrollX} gent={gent} index={i} images={{ photo1 }} />
        );
      }
      else if (i === 3 && photo2) {
        return (
          <SetupImage key={i} inputRange={inputRange} scrollX={this.state.scrollX} gent={gent} index={i} images={{ photo2 }} />
        );
      }
      else if (i === 4 && photo3) {
        return (
          <SetupImage key={i} inputRange={inputRange} scrollX={this.state.scrollX} gent={gent} index={i} images={{ photo3 }} />
        );
      }
      else if (i === 5 && photo4) {
        return (
          <SetupImage key={i} inputRange={inputRange} scrollX={this.state.scrollX} gent={gent} index={i} images={{ photo4 }} />
        );
      }
      
      
    }
    
    
    render() {
      console.log('this is the width', width);
      return (
        <View style={{backgroundColor: 'white', flex: 1 }}>
          <View style={styles.nav}>
          <TouchableOpacity
            style={{ width: 80 * (width / 375), alignItems: 'flex-start' }}
            onPress={() => {
                this.props.navigation.navigate('Shopping', { user: this.state.user });
              }}
          >  
              <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              iconStyle={{ marginRight: 10 * (width / 375) }}
              size={40 * (height / 667)}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{backgroundColor: 'white', flex: 2 }}>
            <ImageSectionCard>
              <Animated.ScrollView
              horizontal={true}
              decelerationRate={0.1}
              snapToInterval={width * 0.99}
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
            <BioCardSection>
              <View style={styles.containerStyle}>
                <Text style={styles.name}>{this.state.match.first_name}, {this.state.match.age}</Text>
                <Text style={styles.occupation}>{this.state.match.occupation}</Text>
                <Text style={styles.occupation}>{this.state.match.location}</Text>
              </View>
              <Text style={{ marginTop: 4, marginLeft: 5, color: '#34799b', }}>Bio</Text>
              <View style={styles.bioStyle}>
                {/* <Text>Education: {this.state.match.school}</Text> */}
                <Text style={styles.textStyle}>{this.state.match.general_bio}</Text>
              </View>
            </BioCardSection>
          </ScrollView>
        </View>
      );
    }


  }

  const styles = {
      containerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderBottomWidth: 0.1,
        borderColor: '#34799b',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 5,
        padding: 1,
        alignItems: 'center',
        height: 68 * (height / 667)
    },
    bioStyle: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#34799b',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 1,
      marginBottom: 5,
      padding: 9
    },
    name: {
      fontSize: 24 * (height / 667),
      fontWeight: 'bold',
      fontFamily: 'Cochin'
    },
    textStyle: {
      fontSize: 20 * (height / 667),
      fontFamily: 'Cochin'
    },
    occupation: {
      fontSize: 15 * (height / 667),
      fontWeight: 'normal',
      fontStyle: 'italic'
    },
    nav: {
      height: 70 * (height / 667),
      flexDirection:'row',
      paddingTop: 10 * (height / 667),
      marginLeft: 10 * (width / 375),
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomWidth:1,
      borderColor:'rgba(0, 0, 0, 0.1)'
    }
  };

export default ShowShop;
