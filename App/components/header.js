/*
//Import Libraries for making a component
import React from 'react';
import { Text, View, Image } from 'react-native';
import ImageHeader from 'react-native-image-header';
// Make a component

const Header = (props) => {
  const { textStyle, vincentStyle } = styles;
  const backgroundImage = require('./images/logo.png');
  return (
    <ImageHeader 
      headerChildren={
      <View style={vincentStyle}>
        <Image source ={require('./images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
      </View>
      } >
    </ImageHeader>
  );
};

const styles = {
  vincentStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    //opacity means fade or see through
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
    
  },
  textStyle: {
    fontSize: 20,
    color: '#3E4583'
  }
};

//Make the component available to other parts of the app
export default Header;

*/
