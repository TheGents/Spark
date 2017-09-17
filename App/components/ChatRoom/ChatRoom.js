
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


class ChatRoom extends Component {
  render() {
    return (
      <View>
        <View style={styles.nav}>
          <TouchableOpacity 
            onPress={() => {
            this.props.navigation.navigate('Messages');
            }}
          >
          <Image source ={require('../images/suit.png')} name="ios-person" color ="#888" size={25} style={{width:30, height:30, margin:10}} />
          </TouchableOpacity>
          <Image source ={require('../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
        </View>
        <View>
          <Text>
            Chatroom
          </Text>
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
  nav: {
    height:60,
    flexDirection:'row',
    paddingTop:10,
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  },
});

export default ChatRoom;

