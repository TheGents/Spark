import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    this.setState({
      // messages: [
      //   {
      //     _id: 1,
      //     text: 'This is grey while messager is blue',
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'React Native',
      //       avatar: 'https://facebook.github.io/react/img/logo_og.png'
      //     }
      //   }
      // ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => {
            this
              .props
              .navigation
              .navigate('Messages');
          }}>
            <Image
              source={require('../images/suit.png')}
              name="ios-person"
              color="#888"
              size={25}
              style={{
              width: 30,
              height: 30,
              margin: 10
            }}/>
          </TouchableOpacity>
          <Image
            source={require('../images/logo.png')}
            resizeMode="contain"
            style={{
            width: 100,
            height: 30
          }}/>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
          _id: 1
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  nav: {
    height: 60,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  }
});

export default ChatRoom;