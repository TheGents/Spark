/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ListView,
  Button,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Nav from '../global-widgets/nav';
import SwipeCards from 'react-native-swipe-cards';
import Axios from 'axios';
//import Icon from 'react-native-vector-icons/MaterialIcons';
//import Iconz from 'react-native-vector-icons/Ionicons';

const image1 = require('../images/eric.jpeg');
const image2 = require('../images/danish.jpeg');
const image3 = require('../images/christopher.jpg');
const image4 = require('../images/terri.jpeg');
const image5 = require('../images/andy.jpeg');
const image6 = require('../images/seven.jpeg');
const image7 = require('../images/david.jpg');
const image8 = require('../images/dylan.jpeg');
const image9 = require('../images/franklin.png');
const image10 = require('../images/mitchell.jpeg');
const image11 = require('../images/shea.jpeg');
const convos = [];
// var convos = [
//   {
//     id: 1,
//     name: 'Eric',
//     message: 'Suspendisse accumsan tortor quis turpis.',
//     image: image1
//   },
//   {
//     id: 2,
//     name: 'Daanish',
//     message:
//       'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
//     image: image2
//   },
//   {
//     id: 3,
//     name: 'Christopher',
//     message: 'Duis bibendum.',
//     image: image3
//   },
//   {
//     id: 4,
//     name: 'Terri',
//     message: 'Praesent blandit.',
//     image: image4
//   },
//   {
//     id: 5,
//     name: 'Andy',
//     message: 'Mauris enim leo, rhoncus sed, vestibulum, cursus id, turpis.',
//     image: image5
//   },
//   {
//     id: 6,
//     name: 'Stven',
//     message: 'Aliquam sit amet diam in magna bibendum imperdiet.',
//     image: image6
//   },
//   {
//     id: 7,
//     name: 'David',
//     message: 'Phasellus sit amet erat.',
//     image: image7
//   },
//   {
//     id: 8,
//     name: 'Dylan',
//     message: 'Vestibulum ante ipsum bilia Curae; Duis faucibus accumsan odio.',
//     image: image8
//   },
//   {
//     id: 9,
//     name: 'Frank',
//     message: 'Aliquam non mauris.',
//     image: image9
//   },
//   {
//     id: 10,
//     name: 'Mitchell',
//     message: 'Nulla ac enim.',
//     image: image10
//   }
// ];

// var newMatches = [
//   {
//     id: 1,
//     first_name: 'David',
//     image: image7
//   },
//   {
//     id: 2,
//     first_name: 'Dylan',
//     image: image8
//   },
//   {
//     id: 3,
//     first_name: 'Frank',
//     image: image9
//   },
//   {
//     id: 4,
//     first_name: 'Mitchell',
//     image: image10
//   },
//   {
//     id: 5,
//     first_name: 'Shea',
//     image: image11
//   },
//   {
//     id: 6,
//     first_name: 'Andy',
//     image: image5
//   },
//   {
//     id: 7,
//     first_name: 'Steven',
//     image: image6
//   },
//   {
//     id: 8,
//     first_name: 'David',
//     image: image7
//   },
//   {
//     id: 9,
//     first_name: 'Eric',
//     image: image1
//   },
//   {
//     id: 10,
//     first_name: 'Shea',
//     image: image11
//   }
// ];

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // dataSource: ds.cloneWithRows(newMatches),
      convoData: ds.cloneWithRows(convos),
      kitkats: true,
      userInfo: props.navigation.state.params.user
    };
  }
  componentWillMount() {
    Axios.get(
      `http://localhost:3000/getmatches/${this.state.userInfo.facebook_auth_id}/${this.state
        .userInfo.gender}`
    ).then(response => {
      //This is a temporary variable to see if the response is pulled from the axios request to consolelog above the render.
      this.setState({ kitkats: response.data });
      const matchedUsers = response.data;
      if (this.state.userInfo.gender === '0') {
        matchedUsers.map(x => {
          convos.push({
            id: x.dude_id,
            name: x.first_name,
            image: x.facebook_pic,
            chatRoom: x.id
          });
        });
      }
      if (this.state.userInfo.gender === '1') {
        matchedUsers.map(x => {
          convos.push({
            id: x.chick_id,
            name: x.first_name,
            image: x.facebook_pic,
            chatRoom: x.id
          });
        });
      }
      this.setState({ convoData: ds.cloneWithRows(convos) });
    });
  }

  // eachPic(x) {
  //   return (
  //     <TouchableOpacity style={{ alignItems: 'center' }}>
  //       <Image
  //         source={x.image}
  //         style={{ width: 70, height: 70, borderRadius: 35, margin: 10 }}
  //       />
  //       <Text style={{ fontWeight: '600', color: '#444' }}>{x.first_name}</Text>
  //     </TouchableOpacity>
  //   );
  // }

  convoRender(x) {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 5,
          marginBottom: 5,
          borderBottomWidth: 1,
          borderColor: '#e3e3e3'
        }}
        onPress={() => {
          this.props.navigation.navigate('Chat', { user: this.state.userInfo, match: x });
        }}
      >
        <Image
          source={{ uri: x.image }}
          style={{ width: 70, height: 70, borderRadius: 35, margin: 10 }}
        />
        <View>
          <Text style={{ fontWeight: '600', color: '#111' }}>{x.name}</Text>
          <Text numberOfLines={1} style={{ fontWeight: '400', color: '#888', width: 200 }}>
            {/* {x.message} */}
            New match!
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    // console.log('userInfo: ',this.state.userInfo);
    // console.log('kitkats: ',this.state.kitkats);
    // console.log('convoData: ',this.state.convoData);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.nav}>
          {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Shopping', { user: this.state.userInfo });
            }}
          >
            <Image
              source={require('../images/Spark.png')}
              name="ios-chatboxes-outline"
              size={25}
              style={{ width: 30, height: 30, margin: 10 }}
            />

            {/* <Image source ={require('../images/suit.png')} name="ios-person" color ="#888" size={25} style={{width:30, height:30, margin:10}} /> */}
          {/* </TouchableOpacity>  */}
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Shopping', { user: this.state.userInfo });
            }}
            name={'ios-flash'}
            type={'ionicon'}
            color={'#03A9F4'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 }}
            size={40}
          />
          <Image
            source={require('../images/logo.png')}
            resizeMode="contain"
            style={{ width: 100, height: 40, margin: 10 }}
          />
          <Text style={styles.titleText} />
          {/* <TouchableOpacity 
            onPress={() => { this.props.navigation.navigate('Chat'); }}
          > */}
          {/* <Image source ={require('../images/suit.png')} name="ios-chatboxes-outline" color ="#555" size={25} style={{width:30, height:30, margin:10}} />
          </TouchableOpacity> */}
        </View>
        {/* <ScrollView style={styles.container}> */}
        {/* <TextInput style={{ height: 50 }} placeholder="Search" />
          <View style={styles.matches}>
            <Text style={{ color: '#da533c', fontWeight: '600', fontSize: 12 }}>
              THESE GENTS NEED SOME BAD BITCHES!
            </Text>
            <ListView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              dataSource={this.state.dataSource}
              pageSize={5}
              renderRow={rowData => this.eachPic(rowData)}
            />
          </View> */}
        <View style={{ margin: 10 }} onPress={console.log('Chat')}>
          <Text style={{ color: '#487cd6', fontWeight: '600', fontSize: 12 }}>MATCHES</Text>
          <ListView
            enableEmptySections
            horizontal={false}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            dataSource={this.state.convoData}
            pageSize={5}
            renderRow={rowData => this.convoRender(rowData)}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}
//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  titleText: {
    width: 50
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
  matches: {
    borderTopWidth: 1,
    paddingTop: 15,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: '#e3e3e3'
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
