
import React from 'react';
import { View } from 'react-native';

const BioCardSection = (props) => {
  return (
    <View style={styles.containerStyle}>{props.children}</View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    height: 300,
    // marginLeft: 1,
    // marginRight: 1,
    // marginTop: 1,
    // marginBottom: 1,
    padding: 1
    // borderBottomWidth: 1,
    // height: 300,
    // width: 300,
    // padding: 5,
    // margin: 5,
    // backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: 'green',
    // position: 'relative'
  }
};

export default BioCardSection;