import React, { Component } from 'react';
import { View, Text, StyleSheet, alert, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Button, Avatar, Icon } from 'react-native-elements';
import Axios from 'axios';
import { Select, Option } from 'react-native-chooser';
import ModalPicker from 'react-native-modal-picker';
// import { Select, Option } from 'react-native-select-list';
const { height, width } = Dimensions.get('window');

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.navigation.state.params.userInfo,
      matched: props.navigation.state.params.matched,
      value: `Rate ${props.navigation.state.params.matched.name}`,
      butt0n: false,
      textInputValue: ''
    };
  }
  onSelect(value) {
    value = value.key;
    console.log('onSelect value', value);
    this.setState({ value });
    this.setState({ butt0n: true });
  }
  setRating() {
    Axios.post('http://webspark.herokuapp.com/postRate', {
      chick_id: this.state.userInfo.facebook_auth_id,
      dude_id: this.state.matched.id,
      rating: this.state.value,
      room_id: this.state.matched.chatRoom
    }).then(response => {
      const newMatched = this.state.matched;
      newMatched.rated = 'true';
      this.setState({ matched: newMatched });
      this.props.navigation.navigate('Chat', { user: this.state.userInfo, match: newMatched });
    });
  }

  render() {
    console.log('hey man this is it', this.state.userInfo);
    // console.log('hey man this is it',this.state.matched);
    const data = [
        { key: 1, label: '1 - Jerk' },
        { key: 2, label: '2 - Intolerable' },
        { key: 3, label: '3 - Average' },
        { key: 4, label: '4 - Great!' },
        { key: 5, label: '5 - Spark!' }
    ];
    
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.nav}>
          <TouchableOpacity
            style={{ width: 80 * (width / 375), alignItems: 'flex-start' }}
            onPress={() => {
              this.props.navigation.navigate('Messages', { user: this.state.userInfo });
            }}
          >  
            <Icon
              name={'ios-arrow-back'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              iconStyle={{ marginLeft: 10 * (height / 677) }}
              size={40 * (height / 667)}
            />
          </TouchableOpacity>  
          <Image
            source={require('../../images/sparkLogo.png')}
            name="ios-chatboxes-outline"
            resizeMode='contain'
            style={{ width: 100 * (width / 375), height: 40 * (height / 667), marginVertical: 1 }}
          />
          <Text style={{ width: 80 * (width / 375) }}>{'        '}</Text>
        </View>
        <View style={styles.avatarStyles}>
        <Text style={styles.titleText}>{this.state.matched.name}</Text> 
          <Avatar
            rounded
            source={{ uri: this.state.matched.image }}
            activeOpacity={0.7}
            width={270 * (width / 375)}
            height={270 * (width / 375)}
          />
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Select
            onSelect={this.onSelect.bind(this)}
            defaultText={this.state.value}
            style={ styles.buttons }
            textStyle={ styles.textStyle8 }
            backdropStyle={{ backgroundColor: 'transparent', alignItems: 'center' }}
            optionListStyle={{ backgroundColor: '#F5FCFF', alignItems: 'center'}}
            
          >
            <Option styleText={styles.ratingText} value={[1, ' - Jerk']}>1 - Jerk</Option>
            <Option styleText={styles.ratingText} value={[2, ' - Intolerable']}>2 - Intolerable</Option>
            <Option styleText={styles.ratingText} value={[3, ' - Average']}>3 - Average </Option>
            <Option styleText={styles.ratingText} value={[4, ' - Great!']}>4 - Great! </Option>
            <Option styleText={styles.ratingText} value={[5, ' - Spark!']}>5 - Spark! </Option>
          </Select> */}
                <ModalPicker
                    data={data}
                    initValue={'Provide Rating'}
                    onChange={this.onSelect.bind(this)}
                    style={ styles.buttons }
                    selectStyle={{ width: 350 * (width / 375), just: 'center', justifyContent: 'center', borderWidth: 0, }}
                    selectTextStyle={styles.textStyle8}
                    overlayStyle={{ borderWidth: 1.5, }}
                    sectionStyle={{ borderWidth: 1.5, }}
                    optionStyle={{ borderWidth: 1.5, height: 50 * (height / 677), alignItems: 'center', justifyContent: 'center' }}
                    optionTextStyle={{ alignItems: 'center', fontSize: 18 * (height / 677) }} 
                    cancelStyle={{ borderWidth: 1.5, height: 50 * (height / 677), alignItems: 'center' }}
                    cancelTextStyle={{ fontSize: 24 * (height / 677) }}
                />

          {this.state.butt0n && (
            <Button
              textStyle={{ fontSize: 18 * (height / 667), fontFamily: 'Avenir Next', color: 'black', fontWeight: '500' }}
              buttonStyle={styles.buttonSmall}
              title={'Confirm Rating'}
              color='black'
              onPress={() => this.setRating()}
            />
            
          )}
          
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10 * (height / 677)
  },
  titleText: {
    fontFamily: 'Cochin',
    fontWeight: '500',
    color: '#34799b',
    fontSize: 26 * (height / 667),
    marginBottom: 5 * (height / 667)
  },
  ratingText: {
    fontSize: 24 * (height / 667), 
    color: 'black',
    fontFamily: 'Cochin',
  },
  nav: {
    height: height / 8.114,
    flexDirection: 'row',
    paddingTop: 10 * (width / 375),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1 * (height / 667),
    borderColor: 'rgba(0,0,0,0.1)'
  },
  buttons: {
    width: 350 * (width / 375),
    borderBottomWidth: 1 * (height / 667),
    borderTopWidth: 1 * (height / 667),
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10 * (height / 677),
    backgroundColor: 'rgba(50,121,155,0.05)',
    height: height / 11.114,
  },
  textStyle8: {
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: 'black',
    fontSize: 18 * (height / 667)
  },
  buttonSmall: {
    width: 350 * (width / 375),
    borderBottomWidth: 1 * (height / 667),
    borderTopWidth: 1 * (height / 667),
    justifyContent: 'center',
    fontFamily: 'Cochin',
    alignItems: 'center',
    backgroundColor: 'rgba(50,121,155,0.05)',
    height: height / 11.114
  },
  matchedName: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarStyles: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // padding: 30 * (height / 677)
  }
});

export default Rating;
