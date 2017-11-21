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
  Alert,
  ScrollView,
  Button
} from 'react-native';
import {
  SharedElement,
  SharedElementGroup
} from '@expo/ex-navigation';
import Axios from 'axios';
import Communications from 'react-native-communications';
import ModalPicker from 'react-native-modal-picker';
import { Icon } from 'react-native-elements';
import ITEMS from './data';
import SetupImage from './MatchImage.js';
import ImageSectionCard from './ImageSectionCard';
import BioCardSection from './BioCardSection';

const {height, width} = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 1;

class ShowShop extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        scrollX: new Animated.Value(0),
        match: props.navigation.state.params.user,
        userInfo: props.navigation.state.params.userInfo,
        matches: [],
        value: '',
        blocked: false
      };
      this.renderItem = this.renderItem.bind(this);
    }
 

  componentWillReceiveProps(nextProps) {
    console.log('match', this.state.match)
    this.setState({ blocked: false, match: nextProps.navigation.state.params.user, userInfo: nextProps.navigation.state.params.userInfo });
  }

  onSelect(value) {
    if (value.key === 0) {
      Communications.email(['vincent.castig@gmail.com', 'vinnycastig@gmail.com'],null,null,'Reporting User', `I would like to report user: ${this.state.match.first_name} with the id number: ${this.state.match.id}`);
    }
    else {
      console.log('match', this.state.match);
      console.log('user', this.state.userInfo);
      const SwipeMatch = false;
      
        Axios.put(
          `http://webspark.herokuapp.com/putMatch/${this.state.match.facebook_auth_id}/${this.state.userInfo
            .facebook_auth_id}/${this.state.userInfo.gender}/${SwipeMatch}`
        ).then(response => {
          console.log('this', response);
          if (response.data.length > 0) {
            Alert.alert(`You have blocked ${this.state.match.first_name}`);
            this.props.navigation.navigate('Shopping', { userInfo: true })
          }
          else {
            Axios.post('http://webspark.herokuapp.com/postMatch', {
              gender: this.state.userInfo.gender,
              matchID: this.state.match.facebook_auth_id,
              ID: this.state.userInfo.facebook_auth_id,
              SwipeMatch
            }).then(response => {
              Alert.alert(`You have blocked ${this.state.match.first_name}`);
              this.props.navigation.navigate('Shopping', { userInfo: true });
            });
          }
      })
    } 
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
      console.log('user', this.state.userInfo);
      const data = [
        { key: 0, label: 'Send Email Report' },
        { key: 1, label: 'Block User' },
    ];
      return (
        <View style={{backgroundColor: 'white', flex: 1 }}>
          <View style={styles.nav}>
          <TouchableOpacity
            style={{ width: 80 * responseWidth, alignItems: 'flex-start' }}
            onPress={() => {
                this.props.navigation.navigate('Shopping');
              }}
          >  
              <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              iconStyle={{ marginRight: 10 * responseWidth }}
              size={40 * responseHeight}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{backgroundColor: 'white', flex: 1 }}>
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
              <View style={ styles.reportStyle }> 
                <ModalPicker
                data={data}
                onChange={this.onSelect.bind(this)}
                style={ styles.buttons }
                selectStyle={{ width: 350 * responseWidth, justifyContent: 'center', borderWidth: 0, }}
                overlayStyle={{ borderWidth: 1.5, }}
                sectionStyle={{ borderWidth: 1.5, }}
                optionStyle={{ borderWidth: 1.5, height: 50 * responseHeight, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
                optionTextStyle={{ alignItems: 'center', fontSize: 18 * responseHeight, color: 'black' }} 
                cancelStyle={{ borderWidth: 1.5, height: 50 * responseHeight, alignItems: 'center' }}
                cancelTextStyle={{ fontSize: 24 * responseHeight }}
            >
            <Text style={ styles.textStyle8 }>Block and Report</Text>
            </ModalPicker>
              </View>
              <View style={styles.massiveHeight}>
                <Text>{''}</Text>
              </View>
            
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
        height: 68 * responseHeight
    },
    buttons: {
      width: 350 * responseWidth,
      borderBottomWidth: 1 * responseHeight,
      borderTopWidth: 1 * responseHeight,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10 * responseHeight,
      backgroundColor: 'rgba(50,121,155,0.05)',
      height: height / 11.114,
    },
    reportStyle: {
      marginTop: 5,
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center'
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
      fontSize: 24 * responseHeight,
      fontWeight: 'bold',
      fontFamily: 'Cochin'
    },
    textStyle: {
      fontSize: 20 * responseHeight,
      fontFamily: 'Cochin',
    },
    textStyle8: {
      fontSize: 20 * responseHeight,
      fontFamily: 'Cochin',
      color: 'red'
    },
    occupation: {
      fontSize: 15 * responseHeight,
      fontWeight: 'normal',
      fontStyle: 'italic'
    },
    nav: {
      height: 70 * responseHeight,
      flexDirection:'row',
      paddingTop: 10 * responseHeight,
      marginLeft: 10 * responseWidth,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomWidth:1,
      borderColor:'rgba(0, 0, 0, 0.1)'
    },
    massiveHeight: {
      height: 260 * responseHeight
    }
  };

export default ShowShop;
