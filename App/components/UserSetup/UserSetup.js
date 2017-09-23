import React, { Component } from 'react';
import { ImagePicker, Constants } from 'expo';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
  Easing,
  ScrollView,
  Button
} from 'react-native';
import {
  SharedElement,
  SharedElementGroup
} from '@expo/ex-navigation';
import ITEMS from './data';
import SetupImage from './SetupImages.js';
import SetupBio from './SetupBio.js';
import Card from './UserCard';
import UserCardSection from './UserCardSection';

const {height, width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.68;
const EMPTY_ITEM_SIZE = width - ITEM_SIZE;
const BAR_HEIGHT = Constants.statusBarHeight * 5;

class Setup extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        scrollX: new Animated.Value(0),
        user: props.navigation.state.params.user,
        value: '',
      };
      this._pickImage = this._pickImage.bind(this);
      this.renderItem = this.renderItem.bind(this);
      this.handleChange = this.handleChangeValue.bind(this);

    }

    componentDidUpdate() {
      // console.log(this.state.value);
    }  

    renderItem(item, i, gent) {
      let { image, photo, third, fourth } = this.state;
      // console.log('usersetup.js', this.state.user);
      gent[i] = new Animated.Value(0);
      
      let inputRange = [
        (i - 3) * ITEM_SIZE,
        (i - 2) * ITEM_SIZE,
        i * ITEM_SIZE,
        (i + 2) * ITEM_SIZE
      ];
      
      // Ensure that we're leaving space for first and last item.
      
      if (!item) {
        return <View key={i} style={{ width: EMPTY_ITEM_SIZE / 2 }} />;
      }
      if(i===1){ 
        return (
          <SetupImage key={i} inputRange={inputRange} ImagePicker={this._pickImage} scrollX={this.state.scrollX} gent={gent} images={ {image, photo, third, fourth }} index={i} />
        );
      }
      else if (i === 2) {
        return (
          <SetupBio key={i} inputRange={inputRange} ImagePicker={this._pickImage} scrollX={this.state.scrollX} gent={gent} index={i} user={ this.state.user } />
        );
      }
      
      
    }
    
    
    render() {
  
      return (
        <View style={{backgroundColor: 'yellow', flex: 1}}>
          <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home') } 
          >
            <Text>Done</Text>
          </TouchableOpacity>
          <Text>Settings</Text>
        </View>
        <ScrollView style={{backgroundColor: 'rgba(32, 52, 52, 0.3)', flex: 1}}>
        <UserCardSection>
        <Animated.ScrollView
        style={{ paddingTop: BAR_HEIGHT * 0.6 }}
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexGrow: 1
        }}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={ITEM_SIZE}
        scrollEventThrottle={16}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
          { useNativeDriver: true }
        )}>

        {ITEMS.map((item, i) => {
          const gent = {};
          return this.renderItem(item, i, gent);
        })
        }
      </Animated.ScrollView>
      </UserCardSection>
      </ScrollView>
        </View>
      );
    }

     _pickImage = async (val) => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        });


      if (!result.cancelled) {
        if(val === 'first' ) {
          this.setState({ image: result.uri });
        }
        else if(val === 'second') {
          this.setState({ photo: result.uri });
        } 
        else if(val === 'third') {
          this.setState({ third: result.uri });
        } 
        else{
          this.setState({ fourth: result.uri });
        }
      }
  };

    handleChangeValue = (e) => {
      // console.log('d', this.state.value);
      this.setState({value: e.target.value})
    };
  }

  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: BAR_HEIGHT,
      backgroundColor: '#fff'
    },
    nav: {
      height:60,
      flexDirection:'row',
      paddingTop:10,
      justifyContent: 'space-between',
      alignItems:'center',
      backgroundColor: '#fff',
      borderBottomWidth:1,
      borderColor:'rgba(0, 0, 0, 0.1)'
    }
  };

export default Setup;
