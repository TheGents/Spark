import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Button, Avatar, Icon } from 'react-native-elements';
import Axios from 'axios';
import { Select, Option } from 'react-native-chooser';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.navigation.state.params.userInfo,
      matched: props.navigation.state.params.matched,
      value: 'Rating',
      butt0n: false
    };
  }
  onSelect(value, label) {
    this.setState({ value });
    this.setState({ butt0n: true });
  }
  setRating() {
    Axios.post('http://localhost:3000/postRate', {
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
    console.log('hey man this is it', this.state.matched);
    // console.log('hey man this is it',this.state.matched);
    // console.log('hey man this is it',this.state.matched);
    // console.log('hey man this is it',this.state.matched);
    // console.log('hey man this is it',this.state.matched);
    // console.log('hey man this is it',this.state.matched);
    // console.log('hey man this is it',this.state.matched);
    // console.log('hey man this is it',this.state.matched);
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
            name={'ios-flash'}
            type={'ionicon'}
            color={'#03A9F4'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 }}
            size={40}
          />
          <Image
            source={require('../../images/sparkLogo.png')}
            name="ios-chatboxes-outline"
            size={25}
            style={{ width: 150, height: 40, marginVertical: 10 }}
          />
          <Text>{'        '}</Text>
          {/* <Text style={styles.titleText} /> */}
        </View>
        <View style={styles.matchedName}>
          <Text>Rate {this.state.matched.name}</Text>
        </View>
        <View style={styles.avatarStyles}>
          <Avatar
            rounded
            source={{ uri: this.state.matched.image }}
            activeOpacity={0.7}
            width={330}
            height={330}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Select
            onSelect={this.onSelect.bind(this)}
            defaultText={this.state.value}
            style={{ borderWidth: 0, marginLeft: '35%', marginBottom: 75 }}
            textStyle={{}}
            backdropStyle={{ backgroundColor: '#009FF2' }}
            optionListStyle={{ backgroundColor: '#F5FCFF' }}
          >
            <Option value={[1, '🌟']}>1 - Jerk </Option>
            <Option value={[2, '🌟🌟']}>2 - Intolerable </Option>
            <Option value={[3, '🌟🌟🌟']}>3 - Average </Option>
            <Option value={[4, '🌟🌟🌟🌟']}>4 - Great! </Option>
            <Option value={[5, '🌟🌟🌟🌟🌟']}>5 - Spark! </Option>
          </Select>
          {this.state.butt0n && (
            <Button
              buttonStyle={{ backgroundColor: '#009FF2' }}
              title="Confirm"
              onPress={() => this.setRating()}
            />
          )}
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
    width: 50
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
    width: 80,
    height: 80,
    borderWidth: 10,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  buttonSmall: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  matchedName: {
    marginVertical: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarStyles: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Rating;
