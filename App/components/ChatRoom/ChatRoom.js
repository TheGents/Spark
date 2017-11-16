import React, { Component } from 'react';

import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,  
  ScrollView,
  TouchableOpacity, 
  Alert,
  TouchableWithoutFeedback,
  Keyboard 
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Icon } from 'react-native-elements';
import Communications from 'react-native-communications';
import ModalPicker from 'react-native-modal-picker';
import Axios from 'axios';

const { height, width } = Dimensions.get('window');

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      // timestamp: 'no timestamp yet',
      all: props.navigation.state.params,
      roomID: props.navigation.state.params.match.chatRoom,
      userInfo: props.navigation.state.params.user,
      matched: props.navigation.state.params.match,
      kitkats: 'This is a test to console log the return from axios',
      showRatingButton: true,
      booleon: 'hi',
      matchesLoaded: false
    };
    this.dismiss = this.dismiss.bind(this);
    this.dismissBack = this.dismissBack.bind(this);
  }

  componentDidMount() {
    // setInterval(() => {
      Axios.get(`http://webspark.herokuapp.com/getmessage/${this.state.roomID}`).then((response)=> {
        this.setState({ kitkats: response.data });
        let katkat = response.data;
        let messageDB = [];
        katkat.map((x)=> {
          let avvy = "";
          if (x.user_id == this.state.matched.id) {
            avvy = this.state.matched.image;
          }
          if (x.user_id == this.state.userInfo.id) {
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
        this.setState({ messages: messageDB, matchesLoaded: true });
        if (this.state.matched.rated == 'true') {
          this.setState({ showRatingButton: false })
        }
        else {
          this.setState({ showRatingButton: true })
        }
      });
  // }, 3000);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ roomID: nextProps.navigation.state.params.match.chatRoom })
    this.setState({ matched: nextProps.navigation.state.params.match })
    this.setState({ messages: [] })
    if(this.state.matched.rated == 'true') {
      this.setState({ showRatingButton: false })
      this.setState({ booleon: true })
    }
    else {
      this.setState({ showRatingButton: true })
      this.setState({ booleon: false })
    }
    
    Axios.get(`http://webspark.herokuapp.com/getmessage/${nextProps.navigation.state.params.match.chatRoom}`).then((response)=> {
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
  

  onSend(messages = []) {
    // console.log(messages);
    let room_id = this.state.roomID;
    let user_id = messages[0].user._id;
    let created_at = messages[0].createdAt;
    let message = messages[0].text;
    Axios.post('http://webspark.herokuapp.com/postmessage', { room_id: room_id, user_id: user_id, created_at: created_at, message: message  } ).then((response)=>console.log(response));
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  dismiss = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('Messages');
  }
  dismissBack = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('Rating', { userInfo: this.state.userInfo, matched: this.state.matched });
  }

onSelect(value) {
  console.log('onSelect value', value);
  if (value.key === 0) {
    Communications.email(['vincent.castig@gmail.com', 'vinnycastig@gmail.com'],null,null,'Reporting User', `I would like to report user with the id number: ${this.state.matched.id}`)
  }

  else if (value.key === 1) {
    console.log('in ths matched', this.state.matched);
    console.log('in ths userInfo', this.state.userInfo);
    Axios.put(
      `http://webspark.herokuapp.com/putMatch/${this.state.matched.id}/${this.state.userInfo.facebook_auth_id}/${this.state.userInfo.gender}/${false}`
    ).then(response => {
      Alert.alert('Match Has Been Removed');
      this.setState({ matched: '' });
      this.props.navigation.navigate('Messages', { y: '' });
      console.log(response);
    });
}
}


  render() {
    // console.log('hello this is the hidden rating butotn test', this.state.matched.rated == 'true')
    // console.log('This is userInfo',this.state.userInfo);
    // console.log('This is matchedInfo',this.state.matched);
    // console.log('this is rating passback from rate', this.state.checkRating)
    
    console.log('booleon',this.state.booleon);
    console.log('wow', this.state.matched.rated == 'true');
    const data = [
      { key: 0, section: true, label: 'Repor Usert' },
      { key: 1, label: 'Delete User' },
      
  ];
    // console.log('This is getRequest',this.state.kitkats);
    //We are rendering two if statements.
    //To make this more clear, should make this into a separate component and then render it here.
    //Also, have to make star activations ratings in a different file later.
    if (this.state.userInfo.gender === '0') {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.nav}>
          <TouchableOpacity
          style={{ width: 80 * (width / 375), alignItems: 'flex-start' }}
            onPress={() => {
            this.dismiss();
          }}>
          <Icon
          name={'ios-arrow-back'}
          type={'ionicon'}
          color={'#34799b'}
          underlayColor={'white'}
          size={40 * (height / 667)}
          iconStyle={{ marginLeft: 5 * (width / 375) }}
        />
          </TouchableOpacity>
          <View >
            <Text style={styles.name}>{ this.state.matched.name }</Text>
            {this.state.showRatingButton && <TouchableOpacity
              style={{ width: 40 * (width / 375), paddingRight: 1 * (height / 667) }}
              onPress={() => { this.dismissBack(); }}>
              <Icon
                  name={'ios-star-half'}
                  type={'ionicon'}
                  color={'#34799b'}
                  underlayColor={'white'}
                  size={39 * (height / 667)}
                />
          </TouchableOpacity>}
          </View>
          {/* <TouchableOpacity
            style={{ width: 40 * (width / 375), alignItems: 'flex-end', paddingRight: 10 * (height / 667) }}
            > */}
            <View style={{ width: 70 * (width / 375), alignItems: 'flex-end' }}>
          <ModalPicker
                    data={data}
                    initValue={''}
                    onChange={this.onSelect.bind(this)}
                    style={ styles.buttons }
                    selectStyle={{ width: 70 * (width / 375), justifyContent: 'center', borderWidth: 1, }}
                    selectTextStyle={styles.textStyle8}
                    overlayStyle={{ borderWidth: 1.5, }}
                    sectionStyle={{ borderWidth: 1.5, }}
                    optionStyle={{ borderWidth: 1.5, height: 50 * (height / 677), alignItems: 'center', justifyContent: 'center' }}
                    optionTextStyle={{ alignItems: 'center', fontSize: 18 * (height / 677) }} 
                    cancelStyle={{ borderWidth: 1.5, height: 50 * (height / 677), alignItems: 'center' }}
                    cancelTextStyle={{ fontSize: 24 * (height / 677) }}
                >
                
              <Icon
                  name={'ios-flag'}
                  type={'ionicon'}
                  underlayColor={'white'}
                  size={39 * (height / 667)}
                  title="Email Me"
                  color="#ce260a"
                  accessabilityLabel="Purple Email Me Button"
                  iconStyle={{ marginRight: 5 * (width / 375) }}
                />
          {/* </TouchableOpacity> */}
                </ModalPicker>
                </View>
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
        </TouchableWithoutFeedback>
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
  if (this.state.userInfo.gender === '1') {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TouchableOpacity
          style={{ width: 70 * (width / 375), alignItems: 'flex-start' }}
            onPress={() => {
              this.dismiss();
          }}>
            <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              size={40 * (height / 667)}
              iconStyle={{ marginLeft: 5 * (width / 375) }} 
            />
          </TouchableOpacity>
          </TouchableWithoutFeedback>
          {/* <Text style={styles.name}>{ this.state.timestamp }</Text> */}
          <View style={styles.name}>
            <Text style={styles.name}>{ this.state.matched.name }</Text>
          </View>
          {/* This will display her picture in the center zomgz */}
          {/* <Image
            source={{uri: this.state.matched.image}}
            resizeMode="contain"
            style={{
            width: 100,
            height: 100,
            borderRadius:15,
          }}/> */}
          <View style={{ width: 70 * (width / 375), alignItems: 'flex-end' }}>
          <ModalPicker
                    data={data}
                    initValue={''}
                    onChange={this.onSelect.bind(this)}
                    style={ styles.buttons }
                    selectStyle={{ width: 70 * (width / 375), justifyContent: 'center', borderWidth: 1, borderColor:'red' }}
                    selectTextStyle={styles.textStyle8}
                    overlayStyle={{ borderWidth: 1.5, }}
                    sectionStyle={{ borderWidth: 1.5, }}
                    optionStyle={{ borderWidth: 1.5, height: 50 * (height / 677), alignItems: 'center', justifyContent: 'center' }}
                    optionTextStyle={{ alignItems: 'center', fontSize: 18 * (height / 677) }} 
                    cancelStyle={{ borderWidth: 1.5, height: 50 * (height / 677), alignItems: 'center' }}
                    cancelTextStyle={{ fontSize: 24 * (height / 677) }}
                >

          {/* <TouchableOpacity
            style={{ width: 40 * (width / 375), alignItems: 'flex-end', paddingRight: 10 * (height / 667) }}
            > */}
              <Icon
                  name={'ios-flag'}
                  type={'ionicon'}
                  underlayColor={'white'}
                  size={39 * (height / 667)}
                  color="#ce260a"
                  iconStyle={{ marginRight: 5 * (width / 375) }}
                />
          {/* </TouchableOpacity> */}
          </ModalPicker>
          </View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10 * (height / 667),
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  nav: {
    height: height / 8.114,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    paddingTop: 10 * (height / 667),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  name: {
    fontSize: 26 * (height / 667),
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: '#34799b',
    // marginRight: 10 * (width / 375)
  },
});

export default ChatRoom;