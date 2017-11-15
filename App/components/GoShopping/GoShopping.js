import _ from 'lodash';
import React, { Component } from 'react';
import { 
  StyleSheet, 
  Image, 
  Text, 
  ActivityIndicator, 
  View, 
  AlertIOS, 
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
 } from 'react-native';
import { Icon } from 'react-native-elements';
// import { Navigator } from 'react-native-deprecated-custom-components';
// import SwipeCards from 'react-native-swipe-cards';
import Swiper from 'react-native-deck-swiper';
import Axios from 'axios';
// import { AppLoading } from 'expo';

const { height, width } = Dimensions.get('window');

export default class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      newCards: [],
      matches: [],
      userInfo: props.navigation.state.params.user,
      locationPreference: 10,
      agePreference: [18, 60],
      filtered: 'check to see if state changes and console log before render',
      outofCards: false,
      secondCard: true
    };
  }

  componentDidMount() {
    console.log('age prefernece in shopping', this.state.agePreference);
    console.log('userin shopping', this.state.userInfo.length);
    checkingForCards = () => {
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
            let matchScore = Math.round((this.state.userInfo.location_score - x.location_score) * 71.9735137469);
            if (matchScore < 0) {
              matchScore *= -1; 
            }
            if (x.age >= this.state.agePreference[0] && matchScore <= this.state.locationPreference) {
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
              rating: x.round,
              location_score: x.location_score
            });
          }
          });
          this.setState({ cards: cardInfo, newCards: cardInfo });
        });
      });
    }
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
          let matchScore = Math.round((this.state.userInfo.location_score - x.location_score) * 71.9735137469);
          if (matchScore < 0) {
            matchScore *= -1; 
          }
          if (x.age >= this.state.agePreference[0] && matchScore <= this.state.locationPreference) {
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
            rating: x.round,
            location_score: x.location_score
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
      console.log('these are the newcards that i want', this.state.newCards.length);
      const currentCard = this.state.newCards[card];
      
        const filteredCards = this.state.cards.filter((obj) => {
          return obj !== currentCard;
        });
        this.setState({ cards: filteredCards });
        //try if state for newcards
        if (this.state.cards.length === 0) {
          this.setState({ newCards: '' });
        }
      // console.log('!this.state.Cards', this.state.cards.length);
      // console.log(' newcards.length', this.state.newCards.length);
    
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
          // console.log('this', response.data[0]);
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
      checkingForCards();
      console.log('changing the user');
      }
    if (nextProps.navigation.state.params.locationPreference) {
      this.setState({ location: nextProps.navigation.state.params.locationPreference });
    } 
    if (nextProps.navigation.state.params.agePreference) {
      this.setState({ agePreference: nextProps.navigation.state.params.agePreference });
      console.log('this is my info', this.state.userInfo.location_score);
      

      console.log('cards are the deal', this.state.cards.length);
      const newCardArray = [];
      for (card of this.state.cards) {
        // console.log('this is the cards location score', card);
        let matchScore = Math.round((this.state.userInfo.location_score - card.location_score) * 71.9735137469);
        if (matchScore < 0) {
          matchScore *= -1; 
        }
        console.log('the match score', matchScore);
        console.log('the match card score', card.location_score);
        if (card.age >= nextProps.navigation.state.params.agePreference[0] && card.age <= nextProps.navigation.state.params.agePreference[1] && matchScore <= nextProps.navigation.state.params.locationPreference) {
          console.log('matchscore', card.first_name)
          newCardArray.push(card)
        }
      }
      this.setState({ newCards: newCardArray });
      console.log('these new cards are the deal', this.state.newCards.length);
    }
  }

  // componentWillUnmount() {
  //   this.serverRequest.abort();
  // }
  

  Card(x) {
    // console.log('here is the preference in card', this.state.locationPreference);
    // console.log('here is the card', x);
    let matchScore = Math.round((this.state.userInfo.location_score - x.location_score) * 71.9735137469);
    if (matchScore < 0) {
      matchScore *= -1; 
    }
    
    x.miles = matchScore;
    console.log('in card', x.miles);
    if (x.rating) {
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
            style={{ borderRadius: 15, flex: 1, width: width * 0.9, alignItems: 'center', justifyContent: 'flex-end' }}
          >
              <View style={styles.imageContainer}>
                <Text style={styles.name}>{x.first_name}, {x.age}</Text>
                <Text style={styles.occupation}>{x.occupation}</Text>
                <Text style={styles.occupation}>{x.miles} Miles Away</Text>
                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                  <Text style={styles.occupation}>{x.rating}</Text>
                  <Icon
                    name={'ios-star-half'}
                    type={'ionicon'}
                    color={'#34799b'}
                    underlayColor={'white'}
                    size={21 * (height / 667)}
                    iconStyle={{ marginLeft: 5 * (width / 375) }}
                  />
                </View>
              </View>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }
  
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
              style={{ borderRadius: 15, flex: 1, width: width * 0.9, alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <View style={styles.imageContainer}>
                  <Text style={styles.name}>{x.first_name}, {x.age}</Text>
                  <Text style={styles.occupation}>{x.occupation}</Text>
                  <Text style={styles.occupation}>{x.miles} Miles Away</Text>
                </View>
            </Image>
          </TouchableHighlight>
        </View>
      );
  
  
  
  // return (
  //   <View style={styles.card}>
  //     <Text style={{ paddingBottom: 22 }}>There are no matches, please check back later.</Text>
  //     <ActivityIndicator size='large' color='#34799b' />
  //   </View>  
  // )
   }

  handleYup(cards) {
    const SwipeMatch = true;
    console.log('handleYup', cards);
    console.log('cards', cards);
    PleaseShutYourMouthAndBeQuiet(cards, SwipeMatch);
    // console.log(`Yup for ${card.text}`);
  }

  handleNope(card) {
    const SwipeMatch = false;
    console.log('handleNope', card);
    PleaseShutYourMouthAndBeQuiet(card, SwipeMatch);
    // console.log(`Nope for ${card.text}`);
  }
  noMore = () => {
    console.log('the end of cards');
    this.setState({ newCards: 0 });
    checkingForCards();
  }

  // yup() {
  //   console.log('this.refs.swiper');
  //   this.refs.swiper._goToNextCard();
  // }

  // nope() {
  //   console.log('this.refs.swiper');
  //   this.refs.swiper._goToNextCard();
  // }

  render() {
    console.log('height', height, width);
    console.log('dimensions ', Dimensions.get('window'));
    if (this.state.newCards === 0) {
      console.log('we have 0 cards');
      return (
        <View style={styles.container}>
          <View style={styles.nav}>
            <TouchableOpacity
              style={{ width: 80 * (width / 375) }}
              onPress={() => {
                this.props.navigation.navigate('Home', { userToken: 5 });
              }}
            >
          <Icon
            style={{ alignSelf: 'right' }}
            name={'ios-home'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 * (width / 375) }}
            size={40 * (height / 667)}
          />
          </TouchableOpacity>
            <Image
              source={require('../images/sparkLogo.png')}
              resizeMode="contain"
              style={{ width: 100 * (width / 375), height: 40 * (height / 667), margin: 10 * (height / 667) }}
            />
            <TouchableOpacity
            style={{ width: 80 * (width / 375), alignItems: 'flex-end', paddingRight: 10 * (width / 375) }}
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo, y: this.state.newCards.length });
            }}
          >  
            <Icon
              name={'ios-chatboxes'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              size={37 * (height / 667)}
            />
          </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={{ paddingBottom: 22 * (width / 375), fontSize: 18 * (height / 667) }}>There are no people in your area, please check back later.</Text>
            <ActivityIndicator size='large' color='#34799b' />
        </View>   
        </View>
      );
    }
    if (!this.state.newCards.length > 0) {
      console.log('!_.max', this.state.cards);
      return (
        <View style={styles.container}>
          <View style={styles.nav}>
            <TouchableOpacity
              style={{ width: 80 * (width / 375)}}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
            >
          <Icon
            style={{ alignSelf: 'right' }}
            name={'ios-home'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 * (width / 375) }}
            size={40 * (height / 667)}
          />
          </TouchableOpacity>
            <Image
              source={require('../images/sparkLogo.png')}
              resizeMode="contain"
              style={{ width: 100 * (width / 375), height: 40 * (height / 667), margin: 10 * (width / 375) }}
            />
            <TouchableOpacity
            style={{ width: 80 * (width / 375), alignItems: 'flex-end', paddingRight: 10 * (width / 375) }}
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo, y: this.state.newCards.length });
            }}
            >  
              <Icon
                name={'ios-chatboxes'}
                type={'ionicon'}
                color={'#34799b'}
                underlayColor={'white'}
                size={37 * (height / 667)}
              />
          </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={{ paddingBottom: 22 * (width / 375), fontSize: 18 * (height / 667) }}>There are no people in your area, please check back later.</Text>
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
        <TouchableOpacity
            style={{ width: 80 * (width / 375) }}
            onPress={() => {
                this.props.navigation.navigate('Home');
              }}
            >
          <Icon
            style={{ alignSelf: 'right' }}
            name={'ios-home'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 * (width / 375) }}
            size={40 * (height / 667)}
          />
          </TouchableOpacity>
          <Image
            source={require('../images/sparkLogo.png')}
            resizeMode="contain"
            style={{ width: 100 * (width / 375), height: 40 * (height / 667), margin: 10 * (width / 375) }}
          />
          
        <TouchableOpacity
          style={{ width: 80 * (width / 375), alignItems: 'flex-end' }}
          onPress={() => {
            this.props.navigation.navigate('Messages', { user: this.state.userInfo, y: this.state.newCards.length });
          }}
        >  
          <Icon
            name={'ios-chatboxes'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            size={38 * (height / 667)}
            iconStyle={{ marginRight: 10 * (width / 375) }}
          />
        </TouchableOpacity>
        </View>
        <Swiper
          ref={'swiper'}
          cards={ this.state.newCards }
          /* containerStyle={{ backgroundColor: '#f7f7f7', alignItems: 'center', margin: 20 }} */
          renderCard={cardData => this.Card(cardData)}
          onSwipedAll={this.noMore}
          onSwipedRight={this.handleYup}
          onSwipedLeft={this.handleNope}
          backgroundColor={'transparent'}
          disableBottomSwipe={'true'}
          disableTopSwipe='true'
          showSecondCard={this.state.secondCard}
          /* onTapCardDeadZone={0} */
          marginTop={70 * (height / 667)}
          cardVerticalMargin={10 * (height / 667)}
          overlayLabels={{
            left: {
              title: 'Pass',
              style: {
                label: {
                backgroundColor: 'white',
                color: 'black',
                marginRight: 30 * (width / 375),
                width: 105 * (width / 375),
                fontSize: 38 * (width / 375),
                alignItems: 'center',
                justifyContent: 'center'
                },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30 * (height / 667),
              }  
              }
            },
            right: {
              title: 'Like',
              style: {
                label: {
                  backgroundColor: '#34799b',
                  borderColor: 'black',
                  color: 'white',
                  marginLeft: 30 * (width / 375),
                  /* height: 80 * (height / 677), */
                  width: 105 * (width / 375),
                  fontSize: 38 * (width / 375),
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30 * (height / 667)
                }
              }
            },

          }}
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
    marginLeft: 5 * (width / 375),
    marginRight: 5 * (width / 375),
    marginTop: 10 * (height / 667),
    marginBottom: 7 * (height / 667),
    padding: 0.1 * (height / 667),
    alignItems: 'center',
    width: 270 * (width / 375),
    backgroundColor: 'rgba(222,222,222, 9)'
},
loading: {
  flex: 1,
  justifyContent: 'center'
},
  name: {
    fontSize: 24 * (height / 667),
    fontWeight: 'bold',
    fontFamily: 'Cochin'
  },
  occupation: {
    fontSize: 18 * (height / 667),
    fontWeight: 'normal',
    fontStyle: 'italic'
  },
  nav: {
    height: height / 8.114,
    flexDirection: 'row',
    paddingTop: 10 * (height / 667),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  icon: {
    margin: 20 * (height / 667)
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 9 * (height / 667),
    padding: 10 * (height / 667)
  }
});
