import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Button, Avatar, Icon } from 'react-native-elements';
import Axios from 'axios';
import { Select, Option } from 'react-native-chooser';
// import { Select, Option } from 'react-native-select-list';


class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.navigation.state.params.userInfo,
      matched: props.navigation.state.params.matched,
      value: `Rate ${props.navigation.state.params.matched.name}`,
      butt0n: false
    };
  }
  onSelect(value, label) {
    this.setState({ value });
    this.setState({ butt0n: true });
  }
  setRating() {
    Axios.post('http://mobilespark.herokuapp.com/postRate', {
      chick_id: this.state.userInfo.facebook_auth_id,
      dude_id: this.state.matched.id,
      rating: this.state.value[0],
      room_id: this.state.matched.chatRoom
    }).then(response => {
      const newMatched = this.state.matched;
      newMatched.rated = 'true';
      this.setState({ matched: newMatched });
      this.props.navigation.navigate('Chat', { user: this.state.userInfo, match: newMatched });
    });
  }

  render() {
    console.log('hey man this is it', this.state.userInfo);
    // console.log('hey man this is it',this.state.matched);
    
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.nav}>
          {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo });
            }}
          >
            <Image
              source={require('../../images/Spark.png')}
              name="ios-chatboxes-outline"
              size={25}
              style={{ width: 30, height: 30, margin: 10 }}
            />
          </TouchableOpacity> */}
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo });
            }}
            name={'ios-arrow-back'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 }}
            size={40}
          />
          <Image
            source={require('../../images/sparkLogo.png')}
            name="ios-chatboxes-outline"
            resizeMode='contain'
            style={{ width: 100, height: 40, marginVertical: 1 }}
          />
          <Text>{'        '}</Text>
        </View>
        <View style={styles.avatarStyles}>
        <Text style={styles.titleText}>{this.state.matched.name}</Text> 
          <Avatar
            rounded
            source={{ uri: this.state.matched.image }}
            activeOpacity={0.7}
            width={270}
            height={270}
          />
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Select
            onSelect={this.onSelect.bind(this)}
            defaultText={this.state.value}
            style={ styles.buttons }
            textStyle={ styles.textStyle8 }
            backdropStyle={{ backgroundColor: 'rgba(50,121,155,0.4)', alignItems: 'center' }}
            optionListStyle={{ backgroundColor: '#F5FCFF', alignItems: 'center'}}
            
          >
            <Option styleText={styles.ratingText} value={[1, ' - Jerk']}>1 - Jerk</Option>
            <Option styleText={styles.ratingText} value={[2, ' - Intolerable']}>2 - Intolerable</Option>
            <Option styleText={styles.ratingText} value={[3, ' - Average']}>3 - Average </Option>
            <Option styleText={styles.ratingText} value={[4, ' - Great!']}>4 - Great! </Option>
            <Option styleText={styles.ratingText} value={[5, ' - Spark!']}>5 - Spark! </Option>
          </Select>
          {this.state.butt0n && (
            <Button
              textStyle={{ fontSize: 18, fontFamily: 'Avenir Next', color: 'black', fontWeight: '500' }}
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
    padding: 10
  },
  titleText: {
    fontFamily: 'Cochin',
    fontWeight: '500',
    color: '#34799b',
    fontSize: 26,
    marginBottom: 5
  },
  ratingText: {
    fontSize: 24, 
    color: 'black',
    fontFamily: 'Cochin',
  },
  nav: {
    height: 70,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  buttons: {
    width: 350,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(50,121,155,0.05)'
  },
  textStyle8: {
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: 'black',
    fontSize: 18
    
  },
  buttonSmall: {
    width: 350,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'center',
    fontFamily: 'Cochin',
    alignItems: 'center',
    backgroundColor: 'rgba(50,121,155,0.05)'
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
    padding: 30
  }
});

export default Rating;
