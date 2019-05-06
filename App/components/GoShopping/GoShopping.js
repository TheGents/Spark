
import _ from 'lodash';
import React, { Component } from 'react';
import { LinearGradient, Font, Expo } from 'expo';
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
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);

export default class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      newCards: [],
      matches: [],
      userInfo: props.navigation.state.params.user || '',
      locationPreference: 10,
      agePreference: [18, 60],
      filtered: 'check to see if state changes and console log before render',
      outofCards: false,
      secondCard: true
    };
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'open-sans-bold': '../../../assets/fonts/OpenSans-Bold.ttf',
    });
    // console.log('nav', this.props.navigation);
    checkingForCards = () => {
      Axios.get(
        `http://webspark.herokuapp.com/shopTillYouDrop/${this.state.userInfo.gender}`
      ).then(responseD => {
        // console.log('responseD this might be reloading', this.state.userInfo.length);
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
            if (x.age >= this.state.agePreference[0] && x.age <= this.state.agePreference[1] && matchScore <= this.state.locationPreference) {
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
      // console.log('responseD this might be reloading 2', this.state.userInfo.length);
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
          if (x.age >= this.state.agePreference[0] && x.age <= this.state.agePreference[1] && matchScore <= this.state.locationPreference) {
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
      const currentCard = this.state.newCards[card];
      console.log('currentCard', currentCard);
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
      console.log('this.state.matches', this.state.matches);
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
    // checkingForCards();
    if (nextProps.navigation.state.params.user || nextProps.navigation.state.params.userInfo) {
      this.setState({ userInfo: nextProps.navigation.state.params.user });
      checkingForCards();
      }
    if (nextProps.navigation.state.params.agePreference || nextProps.navigation.state.params.locationPreference) {
      this.setState({ agePreference: nextProps.navigation.state.params.agePreference, locationPreference: nextProps.navigation.state.params.locationPreference });
      // console.log('cards are the deal', this.state.cards.length);
      const newCardArray = [];
      
      for (card of this.state.cards) {
        // console.log('this is the cards location score', card);
        let matchScore = Math.round((this.state.userInfo.location_score - card.location_score) * 71.9735137469);
        if (matchScore < 0) {
          matchScore *= -1; 
        }
        // console.log('the match score', matchScore);
        // console.log('the match card score', card.location_score);
        if (card.age >= nextProps.navigation.state.params.agePreference[0] && 
          card.age <= nextProps.navigation.state.params.agePreference[1] && 
          matchScore <= nextProps.navigation.state.params.locationPreference) {
          // console.log('nextProps.navigation.state.params.agePreference[0]', nextProps.navigation.state.params.agePreference[0]);
          // console.log('nextProps.navigation.state.params.agePreference[1]', nextProps.navigation.state.params.agePreference[1]);
          newCardArray.push(card);
          // console.log('newcardarray', newCardArray.length);
        }
      }
      this.setState({ newCards: newCardArray });
    }
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount in shopping');
  //   this.serverRequest.abort();
  // }
  

  Card(x) {

    // console.log('here is the preference in card', this.state.locationPreference);
    // if (x) {
      if (x) {
    let matchScore = Math.round((this.state.userInfo.location_score - x.location_score) * 71.9735137469);
    if (matchScore < 0) {
      matchScore *= -1; 
    }
    x.miles = matchScore;

    if ( x.rating && x.miles <= this.state.locationPreference) {
    return (
      <View style={styles.card}>
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('ShowShop', { user: x, userInfo: this.state.userInfo });
          }}
        >
          <Image
            source={{
              uri:
                x.image
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
                    size={21 * responseHeight}
                    iconStyle={{ marginLeft: 5 * responseWidth }}
                  />
                </View>
              </View>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }
  else if (!x.rating && x.miles <= this.state.locationPreference) {
      return (
        <View style={styles.card}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('ShowShop', { user: x, userInfo: this.state.userInfo });
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
    }
  
  
  // return (
  //   <View style={styles.card}>
  //     <Text style={{ paddingBottom: 22 }}>There are no matches, please check back later.</Text>
  //     <ActivityIndicator size='large' color='#34799b' />
  //   </View>  
  // )
  // }
  }
   }

  handleYup(cards) {
    const SwipeMatch = true;
    PleaseShutYourMouthAndBeQuiet(cards, SwipeMatch);
    // console.log(`Yup for ${card.text}`);
  }

  handleNope(card) {
    const SwipeMatch = false;
    PleaseShutYourMouthAndBeQuiet(card, SwipeMatch);
    // console.log(`Nope for ${card.text}`);
  }
  noMore = () => {
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
    if (this.state.newCards === 0) {
      console.log('we have 0 cards');
      return (
        <View style={styles.container}>
          <View>
          <LinearGradient
          // colors={['#ffffff', '#fffffd', '#dddfdd']}
          colors={['#91c1ef', '#91c1ed', '#9ac1ed']}
          style={styles.nav}
          >
            <TouchableOpacity
              style={{ width: 80 * responseWidth }}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
            >
          <Icon
            /* style={{ alignSelf: 'right' }} */
            name={'ios-home'}
            type={'ionicon'}
            underlayColor={'white'}
            iconStyle={{ 
              color: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 1 }}
            size={40 * responseHeight}
          />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
              <Text style={{ height: 1, borderWidth: 4, borderColor: 'white', borderStyle: 'solid', borderBottomWidth: 0, borderRadius: 2 }} >{' '}</Text>
               
                  <Text style={styles.logo} >Dallas Spark</Text>
               
              <Text style={{ height: 1, borderWidth: 4, borderColor: 'white', borderStyle: 'solid', borderBottomWidth: 0, borderRadius: 2 }} >{' '}</Text>  
            </View>
            <TouchableOpacity
            style={{ width: 80 * responseWidth }}
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo, y: this.state.newCards.length });
            }}
            >  
              <Icon
                name={'ios-chatboxes'}
                type={'ionicon'}
                underlayColor={'white'}
                size={37 * responseHeight}
                iconStyle={{ 
                  color: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.9,
                  shadowRadius: 1 }}
              />
          </TouchableOpacity>
          </LinearGradient>
          </View>
          <View style={styles.card}>
            <Text style={{ paddingBottom: 22 * responseWidth, fontSize: 18 * responseHeight }}>There are no people in your area, please check back later.</Text>
            <ActivityIndicator size='large' color='#34799b' />
        </View>   
        </View>
      );
    }
    if (!this.state.newCards.length > 0) {
      return (
        <View style={styles.container}>
          <View>
          <LinearGradient
          // colors={['#ffffff', '#fffffd', '#dddfdd']}
          colors={['#91c1ef', '#91c1ed', '#9ac1ed']}
          style={styles.nav}
          >
            <TouchableOpacity
              style={{ width: 80 * responseWidth }}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
            >
          <Icon
            /* style={{ alignSelf: 'right' }} */
            name={'ios-home'}
            type={'ionicon'}
            underlayColor={'white'}
            iconStyle={{ 
              color: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 1 }}
            size={40 * responseHeight}
          />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
              <Text style={{ height: 1, borderWidth: 4, borderColor: 'white', borderStyle: 'solid', borderBottomWidth: 0, borderRadius: 2 }} >{' '}</Text>
               
                  <Text style={styles.logo} >Dallas Spark</Text>
               
              <Text style={{ height: 1, borderWidth: 4, borderColor: 'white', borderStyle: 'solid', borderBottomWidth: 0, borderRadius: 2 }} >{' '}</Text>  
            </View>
            <TouchableOpacity
            style={{ width: 80 * responseWidth }}
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo, y: this.state.newCards.length });
            }}
            >  
              <Icon
                name={'ios-chatboxes'}
                type={'ionicon'}
                iconStyle={{ 
                  color: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.9,
                  shadowRadius: 1 }}
                underlayColor={'white'}
                size={37 * responseHeight}
              />
          </TouchableOpacity>
          </LinearGradient>
          </View>
          <View style={styles.card}>
            <Text style={{ paddingBottom: 22 * responseWidth, fontSize: 18 * responseHeight }}>There are no people in your area, please check back later.</Text>
          </View>    
        </View>
      );
    }

    // console.log('hey this is noob', this.state.filtered);
    // console.log('hey this is poop', this.state.matches);
    return (
      <View style={styles.container}>
        <View>
          <LinearGradient
          // colors={['#ffffff', '#fffffd', '#dddfdd']}
          colors={['#91c1ef', '#91c1ed', '#9ac1ed']}
          style={styles.nav}
          >
            <TouchableOpacity
              style={{ width: 80 * responseWidth }}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
            >
          <Icon
            /* style={{ alignSelf: 'right' }} */
            name={'ios-home'}
            type={'ionicon'}
            underlayColor={'white'}
            iconStyle={{ 
              color: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 1 }}
            size={40 * responseHeight}
          />
          </TouchableOpacity>
            {/* <Image
              source={require('../images/sparkLogo.png')}
              resizeMode="contain"
              style={{ width: 100 * responseWidth, height: 40 * responseHeight, margin: 10 * responseWidth }}
            /> */}
            <View style={styles.logoContainer}>
              <Text style={{ height: 1, borderWidth: 4, borderColor: 'white', borderStyle: 'solid', borderBottomWidth: 0, borderRadius: 2 }} >{' '}</Text>
               
                  <Text style={styles.logo} >Dallas Spark</Text>
               
              <Text style={{ height: 1, borderWidth: 4, borderColor: 'white', borderStyle: 'solid', borderBottomWidth: 0, borderRadius: 2 }} >{' '}</Text>  
            </View>
            <TouchableOpacity
            style={{ width: 80 * responseWidth }}
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo, y: this.state.newCards.length });
            }}
            >  
              <Icon
                name={'ios-chatboxes'}
                type={'ionicon'}
                iconStyle={{ 
                  color: 'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.9,
                  shadowRadius: 1 }}
                underlayColor={'white'}
                size={37 * responseHeight}
              />
          </TouchableOpacity>
          </LinearGradient>
          </View>
        <Swiper
          cards={ this.state.newCards }
          /* containerStyle={{ backgroundColor: '#f7f7f7', alignItems: 'center', margin: 20 }} */
          renderCard={cardData => this.Card(cardData)}
          onSwipedAll={this.noMore}
          onSwipedRight={this.handleYup}
          onSwipedLeft={this.handleNope}
          backgroundColor={'rgba(0, 0, 0, 0.0)'}
          disableBottomSwipe={'true'}
          disableTopSwipe='true'
          showSecondCard={this.state.secondCard}
          /* onTapCardDeadZone={0} */
          marginTop={70 * responseHeight}
          cardVerticalMargin={10 * responseHeight}
          overlayLabels={{
            left: {
              title: 'Pass',
              style: {
                label: {
                backgroundColor: 'white',
                color: 'black',
                marginRight: 30 * responseWidth,
                
                fontSize: 38 * responseWidth,
                alignItems: 'center',
                justifyContent: 'center'
                },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 30 * responseHeight,
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
                  marginLeft: 30 * responseWidth,
                  paddingLeft: 10 * responseWidth,
                  paddingRight: 10 * responseWidth,
                  /* height: 80 * responseHeight, */
                  fontSize: 38 * responseWidth,
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30 * responseHeight
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
    marginLeft: 5 * responseWidth,
    marginRight: 5 * responseWidth,
    marginTop: 10 * responseHeight,
    marginBottom: 7 * responseHeight,
    padding: 0.1 * responseHeight,
    alignItems: 'center',
    width: 270 * responseWidth,
    backgroundColor: 'rgba(222,222,222, 9)'
},
loading: {
  flex: 1,
  justifyContent: 'center'
},
  name: {
    fontSize: 24 * responseHeight,
    fontWeight: 'bold',

    // fontFamily: 'Cochin'
  },
  occupation: {
    fontSize: 18 * responseHeight,
    fontWeight: 'normal',
    fontStyle: 'italic'
  },
  nav: {
    height: height / 8.114,
    flexDirection: 'row',
    paddingTop: 10 * responseHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },
  logoContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 6, 
    flexDirection: 'row', 
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 33 * responseHeight,
    // borderStyle: 'hidden',
    // borderWidth: 4 * responseHeight,
    paddingTop: 4 * responseHeight,
    paddingBottom: 4 * responseHeight
  },
  logo: {
    fontFamily: 'open-sans-bold',
    fontSize: 24 * responseWidth,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.0)',
    color: 'white'
  },
  icon: {
    margin: 20 * responseHeight
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 9 * responseHeight,
    padding: 10 * responseHeight
  }
});
