
import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>

    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 1,
    marginBottom: 20,
    padding: 1
    // borderBottomWidth: 1,
    // height: 300,
    // width: 300,
    // padding: 5,
    // backgroundColor: '#fff',
    // justifyContent: 'flex-start',
    // flexDirection: 'row',
    // borderColor: '#ddd',
    // position: 'relative'
  }
};

export default CardSection;