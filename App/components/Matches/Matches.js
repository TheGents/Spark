import _ from 'lodash';
import React, { Component } from 'react';
import AppLoading from 'expo';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ListView,
  ActivityIndicator,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Axios from 'axios';

const { height, width } = Dimensions.get('window');

let convos = [];

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // dataSource: ds.cloneWithRows(newMatches),
      convoData: ds.cloneWithRows(convos),
      kitkats: true,
      userInfo: props.navigation.state.params.user,
      matchesLoaded: false
    };
  }

  componentDidMount() {
    Axios.get(
      `http://webspark.herokuapp.com/getmatches/${this.state.userInfo.facebook_auth_id}/${this.state
        .userInfo.gender}`
    ).then(response => {
      //This is a temporary variable to see if the response is pulled from the axios request to consolelog above the render.
      this.setState({ kitkats: response.data });
      const matchedUsers = response.data;
      if (this.state.userInfo.gender === '0') {
        console.log('gender is zero in matches. Here is res.data', matchedUsers);
        matchedUsers.map(x => {
          convos.push({
            id: x.dude_id,
            name: x.first_name,
            image: x.facebook_pic,
            chatRoom: x.id,
            rated: x.rated
          });
        });
      }
      if (this.state.userInfo.gender === '1') {
        matchedUsers.map(x => {
          convos.push({
            id: x.chick_id,
            name: x.first_name,
            image: x.facebook_pic,
            chatRoom: x.id,
            rated: x.rated
          });
        });
      }
      this.setState({ convoData: ds.cloneWithRows(convos), matchesLoaded: true });
    });

    addNewMatch = () => {
      Axios.get(
        `http://webspark.herokuapp.com/getmatches/${this.state.userInfo.facebook_auth_id}/${this.state
          .userInfo.gender}`
      ).then(response => {
        //This is a temporary variable to see if the response is pulled from the axios request to consolelog above the render.
        this.setState({ kitkats: response.data });
        const newMatchedUsers = response.data;
        if (this.state.userInfo.gender === '0') {
          convos = [];
          newMatchedUsers.map(x => {
            for (objects of convos) {
              if (objects.id === x.dude_id) {
                return;
              }
            }
                convos.push({
                  id: x.dude_id,
                  name: x.first_name,
                  image: x.facebook_pic,
                  chatRoom: x.id,
                  rated: x.rated
                });
            })
          }
        else if (this.state.userInfo.gender === '1') {
          convos = [];
          newMatchedUsers.map(x => {
            for (objects of convos) {
              console.log('x', x)
              console.log('objects', objects)
              if (objects.id === x.chick_id) {
                console.log('y', x)
                return;
              }
            }
            convos.push({
              id: x.chick_id,
              name: x.first_name,
              image: x.facebook_pic,
              chatRoom: x.id,
              rated: x.rated
            });
          });
        }
        this.setState({ convoData: ds.cloneWithRows(convos), matchesLoaded: true });
      });
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.navigation.state.params.y);
    this.setState({ userInfo: nextProps.navigation.state.params.user, y: nextProps.navigation.state.params.y });
    addNewMatch();
  }
  
  
  // eachPic(x) 
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
          marginTop: 5 * (height / 667),
          marginBottom: 5 * (height / 667),
          borderBottomWidth: 1 * (height / 667),
          borderColor: '#e3e3e3'
        }}
        onPress={() => {
          this.props.navigation.navigate('Chat', { user: this.state.userInfo, match: x });
        }}
      >
        <Image
          source={{ uri: x.image }}
          style={{ width: 70 * (width / 375), height: 70 * (height / 667), borderRadius: 35, margin: 10 * (height / 667) }}
        />
        <View>
          <Text style={{ fontSize: 20 * (height / 667), fontWeight: '600', color: '#111' }}>{x.name}</Text>
          <Text numberOfLines={1} style={{ fontSize: 20 * (height / 667), fontWeight: '400', color: '#888', width: 200 * (width / 375) }}>
            {/* {x.message} */}
            New match!
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    // console.log('userInfo: ',this.state.userInfo);
    // console.log('kitkats: ', this.state.kitkats);
    // console.log('convoData: ',this.state.convoData);
    if (!this.state.matchesLoaded) {
      return (
        <View style={styles.loading} >
          {/* <View style={styles.nav}>
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Shopping', { user: this.state.userInfo });
            }}
            name={'ios-flash'}
            type={'ionicon'}
            color={'#34799b'}
            underlayColor={'white'}
            iconStyle={{ marginLeft: 10 }}
            size={50}
          />
          <Image
            source={require('../images/sparkLogo.png')}
            resizeMode="contain"
            style={{ width: 100, height: 40, margin: 10, marginLeft: 30 }}
          />
          <Text style={styles.titleText} />
          
        </View> */}
          <ActivityIndicator type='large' color='#34799b' />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.nav}>
          <TouchableOpacity
            style={{ width: 80 * (width / 375), alignItems: 'flex-start' }}
            onPress={() => {
                this.props.navigation.navigate('Shopping', { user: this.state.userInfo });
            }}
          >   
            <Icon
              name={'ios-flash'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              iconStyle={{ marginLeft: 10 * (width / 375), }}
              size={50 * (height / 667)}
            />
        </TouchableOpacity>  
          <Image
            source={require('../images/sparkLogo.png')}
            resizeMode="contain"
            style={{ width: 100 * (width / 375), height: 40 * (height / 667) }}
          />
          <Text style={styles.titleText} />
          
        </View>
        
        <ScrollView style={{ margin: 10 * (height / 667), }} onPress={console.log('Chat')}>
          <Text style={{ color: '#487cd6', fontWeight: '600', fontSize: 12 * (height / 667) }}>MATCHES</Text>
          <ListView
            enableEmptySections
            horizontal={false}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            dataSource={this.state.convoData}
            pageSize={5}
            renderRow={rowData => this.convoRender(rowData)}
          />
        </ScrollView>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10 * (height / 667),
  },
  titleText: {
    width: 80 * (width / 375),
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  nav: {
    height: height / 8.114,
    flexDirection: 'row',
    paddingTop: 10 * (height / 667),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1 * (height / 667),
    borderColor: 'rgba(0,0,0,0.1)'
  },
  matches: {
    borderTopWidth: 1 * (height / 667),
    paddingTop: 15 * (height / 667),
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1 * (height / 667),
    paddingBottom: 15 * (height / 667),
    borderBottomColor: '#e3e3e3'
  },
  buttons: {
    width: 80 * (width / 375),
    height: 80 * (height / 667),
    borderWidth: 10 * (width / 375),
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40 * (height / 667),
  },
  buttonSmall: {
    width: 50 * (width / 375),
    height: 50 * (height / 667),
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25 * (height / 667),
  },
  card: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e3e3e3',
    width: 350 * (width / 375),
    height: 420 * (height / 667)
  }
});
