import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeButtons = () => ({
  onPress,
  name,
  type,
  color,
  iconStyle = styles.iconStyle,
  size,
  underlayColor,
  reverseColor
});

return (
  <TouchableHighlight>
    <Icon  
    style={iconStyle} 
    onPress={onPress} 
    name={name}
    type={type} 
    color={color} 
    iconStyle={iconStyle} 
    size={size}
    underlayColor={underlayColor}
    reverseColor
    reverse
    />
  </TouchableHighlight>
)

HomeButtons.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  color: React.PropTypes.string,
  iconStyle: React.PropTypes.any,
  size: React.PropTypes.number,
  underlayColor: React.PropTypes.string,
  reverseColor: React.PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    iconStyle: {
      margin: 5
    }
  }
});

export default HomeButtons;

        // <Icon
        //   reverse
        //   name="ios-create"
        //   type="ionicon"
        //   color={props.color}
        //   onPress={() => {
        //     this.props.navigation.navigate('Setup', { user: this.state.user });
        //   }}
        // />