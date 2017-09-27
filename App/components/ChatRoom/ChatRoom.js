import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Axios from 'axios';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      roomID: props.navigation.state.params.match.chatRoom,
      userInfo: props.navigation.state.params.user,
      matched: props.navigation.state.params.match,
      kitkats: 'This is a test to console log the return from axios'
    };
  }
 
  componentWillReceiveProps(nextProps){
    this.setState({ roomID: nextProps.navigation.state.params.match.chatRoom })
    this.setState({ matched: nextProps.navigation.state.params.match })
    this.setState({ messages: [] })
    Axios.get(`http://localhost:3000/getmessage/${nextProps.navigation.state.params.match.chatRoom}`).then((response)=> {
      this.setState({ kitkats: response.data });
      let katkat = response.data;
      let messageDB = [];
      katkat.map((x)=> {
        let avvy = "";
        if(x.user_id == this.state.matched.id) {
          avvy = this.state.matched.image;
        }
        if(x.user_id == this.state.userInfo.id) {
          avvy = this.state.userInfo.facebook_pic;
        }
        messageDB.push({
          _id: x.id,
          text: x.message,
          createdAt: new Date(x.created_at),
          user: {
            _id: x.user_id,
            avatar: avvy
          }
        })
      })
      messageDB = messageDB.reverse();
      this.setState({ messages: messageDB});
    })
  }

  componentWillMount() {
    
    Axios.get(`http://localhost:3000/getmessage/${this.state.roomID}`).then((response)=> {
      this.setState({ kitkats: response.data });
      let katkat = response.data;
      let messageDB = [];
      katkat.map((x)=> {
        let avvy = "";
        if(x.user_id == this.state.matched.id) {
          avvy = this.state.matched.image;
        }
        if(x.user_id == this.state.userInfo.id) {
          avvy = this.state.userInfo.facebook_pic;
        }
        messageDB.push({
          _id: x.id,
          text: x.message,
          createdAt: new Date(x.created_at),
          user: {
            _id: x.user_id,
            avatar: avvy
          }
        })
      })
      messageDB = messageDB.reverse();
      this.setState({ messages: messageDB});
    })
    
    
    // this.setState({
    //   // messages: [
    //   //   // {
    //   //   //   _id: 1,
    //   //   //   text: 'This is grey while messager is blue',
    //   //   //   createdAt: new Date(),
    //   //   //   user: {
    //   //   //     _id: 2,
    //   //   //     name: 'React Native',
    //   //   //     avatar: 'https://facebook.github.io/react/img/logo_og.png'
    //   //   //   }
    //   //   // }
    //   // ]
    // });
  }

  onSend(messages = []) {
    // console.log(messages);
    let room_id = this.state.roomID;
    let user_id = messages[0].user._id;
    let created_at = messages[0].createdAt;
    let message = messages[0].text;
    Axios.post('http://localhost:3000/postmessage', { room_id: room_id, user_id: user_id, created_at: created_at, message: message  } ).then((response)=>console.log(response));
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    // console.log('This is userInfo',this.state.userInfo);
    console.log('This is matchedInfo',this.state.matched);
    // console.log('This is getRequest',this.state.kitkats);
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
          <Text
          style={{
            color: 'royalblue'
          }}
          >{ this.state.matched.name }</Text>
          {/* This will display her picture in the center zomgz */}
          {/* <Image
            source={{uri: this.state.matched.image}}
            resizeMode="contain"
            style={{
            width: 100,
            height: 100,
            borderRadius:15,
          }}/> */}
        </View>
        <GiftedChat
          placeholder='Message...'
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
          _id: this.state.userInfo.facebook_auth_id,
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  nav: {
    height: 100,
    backgroundColor: 'blue',
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