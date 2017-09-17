
import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView
} from 'react-native';

var {height, width} = Dimensions.get('window');
import Nav from '../global-widgets/nav';


class Setup extends Component {
  render() {
    return (
      <View>
      <View  style={styles.nav}>
      
      <TouchableOpacity 
        onPress={() => {
        this.props.navigation.navigate('Home');
        }}
      >
      <Image source ={require('../images/suit.png')} name="ios-chatboxes-outline" color ="#555" size={25} style={{width:30, height:30, margin:10}} />
      </TouchableOpacity>
    </View>
      <View style={{flex:1}}>

      {/* <Nav  type = "profile" onPress = {() => this.props.navigator.replace({id:'home'})} /> */}
      <Text>Setup</Text>
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
  nav: {
    height:60,
    flexDirection:'row',
    paddingTop:10,
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  }
});  

export default Setup;
