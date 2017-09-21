/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
  





import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import Nav from '../global-widgets/nav';
import { Navigator } from 'react-native-deprecated-custom-components';
import SwipeCards from 'react-native-swipe-cards';
import Axios from 'axios';

var image1 = require('../images/eric.jpeg');
var image2 = require('../images/danish.jpeg');
var image3 = require('../images/terri.jpeg');
var image4 = require('../images/shea.jpeg');
var image5 = require('../images/seven.jpeg');
var image6 = require('../images/andy.jpeg');

// let Cards = [
//   {
//     id: 1,
//     first_name: 'Eric',
//     age: 26,
//     friends: 9,
//     interests: 38,
//     image: image1
//   },
//   {
//     id: 2,
//     first_name: 'Daanish',
//     age: 26,
//     friends: 16,
//     interests: 49,
//     image: image2
//   },
//   {
//     id: 3,
//     first_name: 'Terri',
//     age: 24,
//     friends: 2,
//     interests: 39,
//     image: image3
//   },
//   {
//     id: 4,
//     first_name: 'Shea',
//     age: 33,
//     friends: 18,
//     interests: 50,
//     image: image4
//   },
//   {
//     id: 5,
//     first_name: 'Steven',
//     age: 25,
//     friends: 2,
//     interests: 13,
//     image: image5
//   },
//   {
//     id: 6,
//     first_name: 'Andy',
//     age: 32,
//     friends: 12,
//     interests: 44,
//     image: image6
//   }
// ];




export default class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      cards: [],
      matches: [],
      userInfo: props.navigation.state.params.user,
      filtered: "not replaced",
    };
  }
  componentDidMount() {
    // This part could probably be done all in the backend, but we are trying to test a spread operator axios request.
    Axios.get(`http://localhost:3000/shopTillYouDrop/${this.state.userInfo.gender}`).then((responseD)=> {
      Axios.get(`http://localhost:3000/shopFiltered/${this.state.userInfo.facebook_auth_id}/${this.state.userInfo.gender}`).then((response)=> {
        let filteredx = response.data;
        this.setState({ filtered: response.data })
        let swipedPeople = response.data;
        let person = responseD.data;
        swipedPeople.map((x)=> {
          person.map((y,i)=> {
            if(x === y.facebook_auth_id) {
              person.splice(i,1);
            }
          })
        })
        let cardInfo = [];
        person.map((x)=> { 
          cardInfo.push({ 
            id: x.id,
            first_name: x.first_name,
            age: x.age,
            friends: 32,
            interests: 32,
            image: x.facebook_pic,
            occupation: x.occupation,
            location: x.location,
          }) 
        })
        this.setState({ cards: cardInfo })
      })
    })
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
 Card(x) {
    return (
      <View style={styles.card}>
        <Image
          source={{uri: x.image}}
          resizeMode="contain"
          style={{ width: 350, height: 350 }}
        />
        <View
          style={{
            width: 350,
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', margin: 15, marginTop: 25 }}>
            <Text style={{ fontSize: 20, fontWeight: '300', color: '#444' }}>
              {x.first_name},{' '}
            </Text>
            <Text style={{ fontSize: 21, fontWeight: '200', color: '#444' }}>
              {x.age}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                padding: 13,
                borderLeftWidth: 1,
                borderColor: '#e3e3e3',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Image
                source={require('../images/suit.png')}
                name="people-outline"
                size={20}
                color="#777"
                style={{ width: 25, height: 25, margin: 10 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '200', color: '#555' }}>
                {x.friends}
              </Text>
            </View>
            <View
              style={{
                padding: 13,
                borderLeftWidth: 1,
                borderColor: '#e3e3e3',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Image
                source={require('../images/suit.png')}
                name="import-contacts"
                size={20}
                color="#777"
                style={{ width: 25, height: 25, margin: 10 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '200', color: '#555' }}>
                {x.interests}
              </Text>
            </View>
          </View>
        </View>
        <Text>Work: {x.occupation}</Text>
        <Text>Location: {x.location}</Text>
      </View>
    );
  }
  handleYup(card) {
    console.log(card);
    
    // console.log(`Yup for ${card.text}`);
  }

  handleNope(card) {
    console.log(card);
    // console.log(`Nope for ${card.text}`);
  }
  noMore() {
    return (
      <View style={styles.card}>
        <Text>No More Cards</Text>
      </View>
    );
  }

  yup() {
    console.log(this.refs['swiper']);
    this.refs['swiper']._goToNextCard();
  }

  nope() {
    console.log(this.refs['swiper']);
    this.refs['swiper']._goToNextCard();
  }   


  render() {
    console.log('hey there this is goshopping',this.state.userInfo);
    console.log('hey this is noob', this.state.filtered);
    return (
      <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        >
          <Image
            source={require('../images/suit.png')}
            name="ios-person"
            color="#888"
            size={25}
            style={{ width: 30, height: 30, margin: 10 }}
          />
        </TouchableOpacity>
        <Image
          source={require('../images/logo.png')}
          resizeMode="contain"
          style={{ width: 100, height: 30 }}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Messages');
          }}
        >
          <Image
            source={require('../images/suit.png')}
            name="ios-chatboxes-outline"
            color="#555"
            size={25}
            style={{ width: 30, height: 30, margin: 10 }}
          />
        </TouchableOpacity>
      </View>
    <SwipeCards
      ref = {'swiper'}
      cards={this.state.cards}
      containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
      renderCard={(cardData) => this.Card(cardData)}
      renderNoMoreCards={() => this.noMore()}
      handleYup={this.handleYup}
      handleNope={this.handleNope} />
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
      {/* <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
      <Image source = {require('../images/suit.png')} name='ios-close' size={45} color="#888" style={{width:25, height:25, margin:10}} />
      </TouchableOpacity>
      <TouchableOpacity style = {styles.buttonSmall}>
      <Image source = {require('../images/suit.png')} name='ios-information' size={5} color="#888" style={{width:25, height:25, margin:10}} />
      </TouchableOpacity>
      <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
      <Image source = {require('../images/suit.png')} name='ios-heart-outline' size={36} color="#888" style={{width:25, height:25, margin:5}} />
      </TouchableOpacity> */}
      </View>
    </View>
    );
  }
}

//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f7f7f7'
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
  },
  buttons: {
    width: 80,
    height: 80,
    borderWidth: 10,
    borderColor: '#e7e7e7',
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
  card: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e3e3e3',
    width: 350,
    height: 420
  }
});
