import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';

class Splash extends Component {
    componenetDidMount() {
        this.props.initializeApp();
    }

    componenetDidUpdate() {
        if (this.props.isAppReady) {
            this.props.navigation.navigate('Welcome');
        }
    }
    render() {
    return (
        <View>
            <Text>Girls Rate the Guys</Text>
        </View>
    );
}
}

export default Splash;
