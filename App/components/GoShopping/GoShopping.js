import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, Image, Text, ActivityIndicator, View, AlertIOS, TouchableHighlight } from 'react-native';
import { Button, Avatar, Icon } from 'react-native-elements';
import { Navigator } from 'react-native-deprecated-custom-components';
// import SwipeCards from 'react-native-swipe-cards';
import SwipeCards from 'react-native-deck-swiper';
import Axios from 'axios';
import { AppLoading } from 'expo';

const image1 = require('../images/eric.jpeg');
const image2 = require('../images/danish.jpeg');
const image3 = require('../images/terri.jpeg');
const image4 = require('../images/shea.jpeg');
const image5 = require('../images/seven.jpeg');
const image6 = require('../images/andy.jpeg');


export default class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      newCards: [],
      matches: [],
      userInfo: props.navigation.state.params.user,
      agePreference: [18, 60],
      filtered: 'check to see if state changes and console log before render'
    };
  }

  componentDidMount() {
    console.log('age prefernce in shopping', this.state.agePreference);
    console.log('userin shopping', this.state.userInfo.length);
    Axios.get(
      `http://webspark.herokuapp.com/shopTillYouDrop/${this.state.userInfo.gender}`
    ).then(responseD => {
      console.log('responseD this might be reloading');
      Axios.get(
        `http://webspark.herokuapp.com/shopFiltered/${this.state.userInfo.facebook_auth_id}/${this.state
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
          if (x.age >= this.state.agePreference[0]) {
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
            general_bio: x.general_bio,
            location: x.location,
            facebook_auth_id: x.facebook_auth_id,
            rating: x.round
          });
        }
        });
        this.setState({ cards: cardInfo, newCards: cardInfo });
      });
    });
    Axios.get(
      `http://webspark.herokuapp.com/getPrematch/${this.state.userInfo.facebook_auth_id}/${this.state
        .userInfo.gender}`
    ).then(response => {
      this.setState({ matches: response.data });
    });
    PleaseShutYourMouthAndBeQuiet = (card, SwipeMatch) => {
      // console.log('old cards', this.state.cards);
      console.log('these are the newcards that i want', this.state.newCards);
      const currentCard = this.state.newCards[card];
      
        const filteredCards = this.state.cards.filter((obj) => {
          // console.log('this is obj', obj);
          // console.log('this is deck Cards', this.state.cards[card]);
          return obj !== currentCard;
        });
        this.setState({ cards: filteredCards });
        //try if state for newcards
        if (this.state.cards.length === 0) {
          this.setState({ newCards: '' });
        }
      console.log('!this.state.Cards', this.state.cards.length);
      console.log(' newcards.length', this.state.newCards.length);
    
      // console.log('!this.state.newCards', this.state.newCards.length);
      // this.setState({ cards: false })
      const FoundMatch = [];
      for (let i = 0; i < this.state.matches.length; i++) {
        if (currentCard.facebook_auth_id === this.state.matches[i]) {
          FoundMatch.push(this.state.matches[i]);
        }
      }
      if (FoundMatch.length == 0) {
        Axios.post('http://webspark.herokuapp.com/postMatch', {
          gender: this.state.userInfo.gender,
          matchID: currentCard.facebook_auth_id,
          ID: this.state.userInfo.facebook_auth_id,
          SwipeMatch
        }).then(response => console.log('0', response));
      }
      if (FoundMatch.length > 0) {
        Axios.put(
          `http://webspark.herokuapp.com/putMatch/${currentCard.facebook_auth_id}/${this.state.userInfo
            .facebook_auth_id}/${this.state.userInfo.gender}/${SwipeMatch}`
        ).then(response => {
          console.log('this', response.data[0]);
          if (response.data[0].chick_swipe == response.data[0].dude_swipe) {
            AlertIOS.alert(`You and ${currentCard.first_name} Have Matched!`);
          }
        });
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.user) {
      this.setState({ userInfo: nextProps.navigation.state.params.user });
      console.log('changing the user');
      }
    if (nextProps.navigation.state.params.agePreference) {
      this.setState({ agePreference: nextProps.navigation.state.params.agePreference });
      console.log('cards are the deal', this.state.cards.length);
      const newCardArray = []
      for (card of this.state.cards) {
        if (card.age >= nextProps.navigation.state.params.agePreference[0] && card.age <= nextProps.navigation.state.params.agePreference[1]) {
          newCardArray.push(card)
        }
      }
      this.setState({ newCards: newCardArray });
      console.log('these new cards are the deal', this.state.newCards.length);
    }
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
            resizeMode='cover'
            style={{ borderRadius: 15, flex: 1, width: 300, alignItems: 'center', justifyContent: 'flex-end' }}
          >
              <View style={styles.imageContainer}>
                <Text style={styles.name}>{x.first_name}, {x.age}</Text>
                <Text style={styles.occupation}>{x.occupation}</Text>
                <Text style={styles.occupation}>{x.rating}</Text>
              </View>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }
  handleYup(cardData, cards) {
    const SwipeMatch = true;
    console.log('handleYup', cardData);
    console.log('cards', cards);
    PleaseShutYourMouthAndBeQuiet(cardData, SwipeMatch);
    // console.log(`Yup for ${card.text}`);
  }

  handleNope(card, ) {
    const SwipeMatch = false;
    console.log('handleNope', card);
    PleaseShutYourMouthAndBeQuiet(card, SwipeMatch);
    // console.log(`Nope for ${card.text}`);
  }
  noMore() {
    console.log('the end of cards');
    return (
      <View style={styles.card}>
        <Text style={{ paddingBottom: 22 }}>There are no more matches, please check back later.</Text>
        <ActivityIndicator size='large' color='#34799b' />
      </View>
    );
  }

  yup() {
    console.log('this.refs.swiper');
    this.refs.swiper._goToNextCard();
  }

  nope() {
    console.log('this.refs.swiper');
    this.refs.swiper._goToNextCard();
  }

  render() {
    if (!this.state.newCards.length > 0) {
      console.log('!_.max', this.state.cards);
      return (
        <View style={styles.container}>
          <View style={styles.nav}>
            <Icon
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
              name={'ios-home'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              iconStyle={{ marginLeft: 10 }}
              size={30}
            />
            <Image
              source={require('../images/sparkLogo.png')}
              resizeMode="contain"
              style={{ width: 100, height: 40, margin: 10 }}
            />

            <Icon
              onPress={() => {
                this.props.navigation.navigate('Messages', { user: this.state.userInfo, y: this.state.newCards.length });
              }}
              name={'ios-chatboxes'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              iconStyle={{ marginRight: 10 }}
              size={30}
            />
          </View>
          <View style={styles.loading}>
            <ActivityIndicator size='large' color='#34799b' />
          </View>    
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
            color={'#34799b'}
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
              this.props.navigation.navigate('Messages', { user: this.state.userInfo, y: this.state.newCards.length });
            }}
            name={'ios-chatboxes'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            iconStyle={{ marginRight: 10 }}
            size={30}
          />
        </View>
        <SwipeCards
          ref={'swiper'}
          cards={ this.state.newCards }
          containerStyle={{ backgroundColor: '#f7f7f7', alignItems: 'center', margin: 20 }}
          renderCard={cardData => this.Card(cardData)}
          onSwipedAll={() => this.noMore()}
          onSwipedRight={this.handleYup}
          onSwipedLeft={this.handleNope}
          backgroundColor={'transparent'}
          disableBottomSwipe={'true'}
          disableTopSwipe={'true'}
          onTapCardDeadZone={1}
          marginTop={70}
          cardVerticalMargin={10}
        />
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
  imageContainer: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#34799b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 7,
    padding: 0.1,
    alignItems: 'center',
    width: 270,
    backgroundColor: 'rgba(222,222,222, 9)'
},
loading: {
  flex: 1,
  justifyContent: 'center'
},
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cochin'
  },
  occupation: {
    fontWeight: 'normal',
    fontStyle: 'italic'
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
  icon: {
    margin: 20
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 9,
    padding: 10,
  }
});
