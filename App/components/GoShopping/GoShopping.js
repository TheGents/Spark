import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import { Button, Avatar, Icon } from 'react-native-elements';
import { Navigator } from 'react-native-deprecated-custom-components';
import SwipeCards from 'react-native-swipe-cards';
import Nav from '../global-widgets/nav';
import Axios from 'axios';
import { AppLoading } from 'expo';

const image1 = require('../images/eric.jpeg');
const image2 = require('../images/danish.jpeg');
const image3 = require('../images/terri.jpeg');
const image4 = require('../images/shea.jpeg');
const image5 = require('../images/seven.jpeg');
const image6 = require('../images/andy.jpeg');

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
      filtered: 'check to see if state changes and console log before render'
    };
  }
  componentDidMount() {
    Axios.get(
      `http://localhost:3000/shopTillYouDrop/${this.state.userInfo.gender}`
    ).then(responseD => {
      console.log(responseD);
      Axios.get(
        `http://localhost:3000/shopFiltered/${this.state.userInfo.facebook_auth_id}/${this.state
          .userInfo.gender}`
      ).then(response => {
        const filteredx = response.data;
        this.setState({ filtered: response.data });
        const swipedPeople = response.data;
        const person = responseD.data;
        swipedPeople.map(x => {
          person.map((y, i) => {
            if (x === y.facebook_auth_id) {
              person.splice(i, 1);
            }
          });
        });
        const cardInfo = [];
        person.map(x => {
          cardInfo.push({
            id: x.id,
            first_name: x.first_name,
            age: x.age,
            friends: 32,
            interests: 32,
            image: x.facebook_pic,
            photo1: x.photo1,
            photo2: x.photo2,
            photo3: x.photo3,
            photo4: x.photo4,
            occupation: x.occupation,
            location: x.location,
            facebook_auth_id: x.facebook_auth_id
          });
        });
        this.setState({ cards: cardInfo });
      });
    });
    Axios.get(
      `http://localhost:3000/getPrematch/${this.state.userInfo.facebook_auth_id}/${this.state
        .userInfo.gender}`
    ).then(response => {
      this.setState({ matches: response.data });
    });
    PleaseShutYourMouthAndBeQuiet = (card, SwipeMatch) => {
      const FoundMatch = [];
      for (let i = 0; i < this.state.matches.length; i++) {
        if (card.facebook_auth_id === this.state.matches[i]) {
          FoundMatch.push(this.state.matches[i]);
        }
      }
      if (FoundMatch.length == 0) {
        Axios.post('http://localhost:3000/postMatch', {
          gender: this.state.userInfo.gender,
          matchID: card.facebook_auth_id,
          ID: this.state.userInfo.facebook_auth_id,
          SwipeMatch
        }).then(response => console.log(response));
      }
      if (FoundMatch.length > 0) {
        Axios.put(
          `http://localhost:3000/putMatch/${card.facebook_auth_id}/${this.state.userInfo
            .facebook_auth_id}/${this.state.userInfo.gender}/${SwipeMatch}`
        ).then(response => console.log(response));
      }
    };
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  Card(x) {
    return (
      <View style={styles.card}>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('ShowShop', { user: x });
          }}
        >
          <Image
            source={{
              uri:
                x.image ||
                'https://www.mountaineers.org/images/placeholder-images/placeholder-contact-profile/image_preview'
            }}
            resizeMode="contain"
            style={{ width: 350, height: 350 }}
          />
        </TouchableHighlight>
        <View
          style={{
            width: 250,
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* <View style={{ flexDirection: 'row' }}> */}

          {/* <View
              style={{
                padding: 13,
                borderLeftWidth: 1,
                borderColor: '#e3e3e3',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
            </View> */}
          {/* </View> */}
        </View>
        <Text>
          {x.first_name}, {x.age}
        </Text>
        <Text>Work: {x.occupation}</Text>
        <Text>Location: {x.location}</Text>
      </View>
    );
  }
  handleYup(card) {
    const SwipeMatch = true;
    PleaseShutYourMouthAndBeQuiet(card, SwipeMatch);
    // console.log(`Yup for ${card.text}`);
  }

  handleNope(card) {
    const SwipeMatch = false;
    PleaseShutYourMouthAndBeQuiet(card, SwipeMatch);
    // console.log(`Nope for ${card.text}`);
  }
  noMore() {
    return (
      <View style={styles.card}>
        <Text>No more matches, please check back later.</Text>
      </View>
    );
  }

  yup() {
    console.log(this.refs.swiper);
    this.refs.swiper._goToNextCard();
  }

  nope() {
    console.log(this.refs.swiper);
    this.refs.swiper._goToNextCard();
  }

  render() {

    if (!_.max(this.state.cards)) {
      console.log(this.state.cards);
      return (
        <View style={styles.container}>
          <View style={styles.nav}>
            <Icon
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
              name={'ios-home'}
              type={'ionicon'}
              color={'#03A9F4'}
              underlayColor={'white'}
              iconStyle={{ marginLeft: 10 }}
              size={30}
            />
            <Image
              source={require('../images/sparkLogo.png')}
              resizeMode="contain"
              style={{ width: 100, height: 40, margin: 10 }}
            />
            {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Messages', {user: this.state.userInfo});
            }}
          >
            <Image
              source={require('../images/suit.png')}
              name="ios-chatboxes-outline"
              color="#555"
              size={25}
              style={{ width: 30, height: 30, margin: 10 }}
            />
          </TouchableOpacity> */}

            <Icon
              onPress={() => {
                this.props.navigation.navigate('Messages', { user: this.state.userInfo });
              }}
              name={'ios-chatboxes'}
              type={'ionicon'}
              color={'#03A9F4'}
              underlayColor={'white'}
              iconStyle={{ marginRight: 10 }}
              size={30}
            />
          </View>

          <AppLoading />
        </View>
      );
    }

    // console.log('hey there this is goshopping',this.state.userInfo);
    // console.log('hey this is noob', this.state.filtered);
    // console.log('hey this is poop', this.state.matches);
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
            name={'ios-home'}
            type={'ionicon'}
            color={'#03A9F4'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 }}
            size={30}
          />
          <Image
            source={require('../images/logo.png')}
            resizeMode="contain"
            style={{ width: 100, height: 40, margin: 10 }}
          />
          {/* <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('Messages', {user: this.state.userInfo});
        }}
      >
        <Image
          source={require('../images/suit.png')}
          name="ios-chatboxes-outline"
          color="#555"
          size={25}
          style={{ width: 30, height: 30, margin: 10 }}
        />
      </TouchableOpacity> */}
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo });
            }}
            name={'ios-chatboxes'}
            type={'ionicon'}
            color={'#03A9F4'}
            underlayColor={'white'}
            iconStyle={{ marginRight: 10 }}
            size={30}
          />
        </View>
        <SwipeCards
          ref={'swiper'}
          cards={this.state.cards}
          containerStyle={{ backgroundColor: '#f7f7f7', alignItems: 'center', margin: 20 }}
          renderCard={cardData => this.Card(cardData)}
          renderNoMoreCards={() => this.noMore()}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
    // padding: 10,
    backgroundColor: '#f7f7f7'
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
  icon: {
    margin: 20
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
