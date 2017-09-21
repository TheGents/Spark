
import React from 'react';
import { View } from 'react-native';

const UserCardSection = (props) => {
  return (
    <View style={styles.containerStyle}>{props.children}</View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'red',
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
    // margin: 5,
    // backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: 'green',
    // position: 'relative'
  }
};

export default UserCardSection;