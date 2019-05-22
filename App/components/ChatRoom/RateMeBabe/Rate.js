import React, { Component } from 'react';
import { View, Text, StyleSheet, alert, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Avatar, Icon } from 'react-native-elements';
import Axios from 'axios';
import { Select, Option } from 'react-native-chooser';
import ModalPicker from 'react-native-modal-picker';
// import { Select, Option } from 'react-native-select-list';
const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.navigation.state.params.userInfo,
      matched: props.navigation.state.params.matched,
      value: `Rate ${props.navigation.state.params.matched.name}`,
      butt0n: false,
      textInputValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ userInfo: nextProps.navigation.state.params.userInfo, matched: nextProps.navigation.state.params.matched });
  }

  onSelect(value) {
    value = value.key;
    this.setState({ value });
    this.setState({ butt0n: true });
  }
  setRating() {
    Axios.post('http://webspark.herokuapp.com/postRate', {
      chick_id: this.state.userInfo.facebook_auth_id,
      dude_id: this.state.matched.id,
      rating: this.state.value,
      room_id: this.state.matched.chatRoom
    }).then(response => {
      const newMatched = this.state.matched;
      newMatched.rated = 'true';
      this.setState({ matched: newMatched });
      this.props.navigation.navigate('Chat', { user: this.state.userInfo, match: newMatched });
    });
  }
 

  render() {
    const data = [
        { key: 1, label: '1 - Jerk' },
        { key: 2, label: '2 - Intolerable' },
        { key: 3, label: '3 - Average' },
        { key: 4, label: '4 - Great' },
        { key: 5, label: '5 - Gentleman' }
    ];
    
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          // colors={['#ffffff', '#fffffd', '#dddfdd']}
          colors={['#91c1ef', '#91c1ed', '#9ac1ed']}
          style={styles.nav}
          >
          <TouchableOpacity
            style={{ width: 80 * responseWidth }}
            onPress={() => {
              this.props.navigation.navigate('Chat', { user: this.state.userInfo });
            }}
          >  
            <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              color={'white'}
              underlayColor={'white'}
              iconStyle={{ 
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.9,
                shadowRadius: 1 }}
              size={40 * responseHeight}
            />
          </TouchableOpacity>  
          <Text style={ styles.textStyle }>Rating</Text>
          <Text style={{ width: 80 * responseWidth }}>{'        '}</Text>
        </LinearGradient>
        <View style={styles.avatarStyles}>
        <Text style={styles.titleText}>{this.state.matched.name}</Text> 
          <Avatar
            rounded
            source={{ uri: this.state.matched.image }}
            activeOpacity={0.7}
            width={270 * responseWidth}
            height={270 * responseWidth}
          />
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
                <ModalPicker
                    data={data}
                    initValue={'Provide Rating'}
                    onChange={this.onSelect.bind(this)}
                    style={ styles.buttons }
                    selectStyle={{ width: 350 * responseWidth, justifyContent: 'center', borderWidth: 0, }}
                    selectTextStyle={styles.textStyle8}
                    overlayStyle={{ borderWidth: 1.5, }}
                    sectionStyle={{ borderWidth: 1.5, }}
                    optionStyle={{ borderWidth: 1, height: 50 * responseHeight, alignItems: 'center', justifyContent: 'center', marginTop: 10, backgroundColor: 'white' }}
                    
                    //optionTextStyle={{ alignItems: 'center', fontSize: 18 * responseHeight, color: 'black' }} 
                    cancelStyle={{ borderWidth: 1.5, height: 50 * responseHeight, alignItems: 'center', backgroundColor: 'white' }}
                    cancelTextStyle={{ fontSize: 24 * responseHeight }}
                />

          {this.state.butt0n && (
            <Button
            //fontFamily: 'Avenir Next'
              textStyle={{ fontSize: 18 * responseHeight, color: 'black', fontWeight: '500' }}
              buttonStyle={styles.buttonSmall}
              title={'Confirm Rating'}
              color='black'
              onPress={() => this.setRating()}
            />
            
          )}
          
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10 * responseHeight
  },
  titleText: {
    // fontFamily: 'Cochin',
    fontWeight: '500',
    color: '#34799b',
    fontSize: 26 * responseHeight,
    marginBottom: 5 * responseHeight
  },
  ratingText: {
    fontSize: 24 * responseHeight, 
    color: 'black',
    // fontFamily: 'Cochin',
  },
  nav: {
    height: height / 8.114,
    flexDirection: 'row',
    paddingTop: 10 * responseHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 1 * responseHeight,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
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
  textStyle8: {
    // fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: 'black',
    fontSize: 18 * responseHeight
  },
  textStyle: {
    color: 'white',
    fontSize: 20 * responseHeight,
    fontWeight: '600'
  },
  buttonSmall: {
    width: 350 * responseWidth,
    borderBottomWidth: 1 * responseHeight,
    borderTopWidth: 1 * responseHeight,
    justifyContent: 'center',
    // fontFamily: 'Cochin',
    alignItems: 'center',
    backgroundColor: 'rgba(50,121,155,0.05)',
    height: height / 11.114
  },
  matchedName: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarStyles: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20
    // padding: 30 * responseHeight
  }
});

export default Rating;
