import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Button, Avatar, Icon } from 'react-native-elements';
import Axios from 'axios';
import {Select, Option} from "react-native-chooser";

class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: props.navigation.state.params.userInfo,
            matched: props.navigation.state.params.matched,
            value: 'Rating',
        }
    }
    onSelect(value, label) {
        this.setState({value : value});
      }

    render() {
        console.log(this.state.matched);
        return (
                <View style={{ flex: 1 }}>
                <View  style={styles.nav}>
                    <TouchableOpacity 
                    onPress={() => {
                    this.props.navigation.navigate('Shopping', { user: this.state.userInfo });
                    }}>
                        <Image
                        source={require('../../images/Spark.png')}
                        name="ios-chatboxes-outline"
                        size={25}
                        style={{ width: 30, height: 30, margin: 10 }} />
                    </TouchableOpacity>
                    <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
                    <Text style={styles.titleText}>
                    </Text>
                </View>
                <Text>Rate {this.state.matched.name}</Text>
                <Avatar
              rounded
              source={{ uri: this.state.matched.image }}
              activeOpacity={0.7}
              width={330}
              height={330}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Select
            onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.value}
            style = {{borderWidth : 0 }}
            textStyle = {{}}
            backdropStyle  = {{backgroundColor : "#009FF2"}}
            optionListStyle = {{backgroundColor : "#F5FCFF"}}
            >
              <Option value = { '🌟' } >1 - Jackass </Option>
              <Option value = { '🌟🌟' } >2 - Intolerable </Option>
              <Option value = { '🌟🌟🌟' } >3 - Average </Option>
              <Option value = { '🌟🌟🌟🌟' } >4 - Great! </Option>
              <Option value = { '🌟🌟🌟🌟🌟' } >5 - Soulmate </Option>
            </Select>
            <Button 
            buttonStyle= {{backgroundColor: '#009FF2'}}
            title='Confirm' 
            />
            </View>
            </View>
        )
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
      height:70,
      flexDirection:'row',
      paddingTop:10,
      justifyContent: 'space-between',
      alignItems:'center',
      backgroundColor: '#fff',
      borderBottomWidth:1,
      borderColor:'rgba(0,0,0,0.1)'
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
  });


export default Rating;