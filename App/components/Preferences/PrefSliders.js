'use strict';

import React from 'react';
import { StyleSheet, Dimensions, View, Text, Slider, Image, Platform } from 'react-native';
import MultiSlider from './SliderJS/MultiSlider';

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);

class PrefSliders extends React.Component {
  state = {
    sliderOneChanging: false,
    sliderOneValue: [1],
    multiSliderValue: [18, 60]
  };

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true
    });
  };

  sliderOneValuesChange = values => {
    const newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues
    }, () => {
      this.props.handleLocationValue(this.state.sliderOneValue);
    });
  };

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false
    });
  };

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values
    }, () => {
    this.props.handleChangeValue(this.state.multiSliderValue);
  });
}
  

  render() {
    console.log('slider', this.state.multiSliderValue);
    return (
      <View style={styles.container}>
        <View style={styles.sliders}>
          {/* ----------- DISTANCE SLIDER ----------- */}
          <View style={styles.sliderOne}>
            <Text style={styles.titleText}>Distance</Text>
            <Text style={[styles.sliderValueChange, this.state.sliderOneChanging && styles.titleText, {}]}>
              {this.state.sliderOneValue}
              {' miles'}
            </Text>
          </View>
          <MultiSlider
            values={this.state.sliderOneValue}
            sliderLength={280 * responseWidth}
            onValuesChangeStart={this.sliderOneValuesChangeStart}
            onValuesChange={this.sliderOneValuesChange}
            onValuesChangeFinish={this.sliderOneValuesChangeFinish}
            min={1}
            max={100}
            step={1}
            selectedStyle={{
              backgroundColor: '#34799b'
            }}
            trackStyle={{
              height: 3 * responseHeight
            }}
          />
          {/* ----------- AGE SLIDER ----------- */}
          <View style={styles.sliderOne}>
            <Text style={styles.titleText}>Age</Text>
            <Text style={styles.sliderValueChange}>
              {this.state.multiSliderValue[0]}
              {'-'}
              {this.state.multiSliderValue[1]}
            </Text>
          </View>
          <MultiSlider
            style={styles.sliderOne}
            values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
            sliderLength={280 * responseWidth}
            onValuesChange={this.multiSliderValuesChange}
            min={18}
            max={60}
            step={1}
            allowOverlap
            snapped
            selectedStyle={{
              backgroundColor: '#34799b'
            }}
            trackStyle={{
              height: 3 * responseHeight
            }}
          />
        </View>
      </View>
    );
  }
}

export default PrefSliders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliders: {
    marginTop: 10 * responseHeight,
    marginBottom: 10 * responseHeight
  },
  text: {
    alignSelf: 'flex-start',
    paddingVertical: 20 * responseHeight
  },
  sliderOne: {
    flexDirection: 'row',
    fontSize: 20 * responseHeight,
  },
  titleText: {
    alignSelf: 'flex-start',
    fontSize: 20 * responseHeight,
    paddingVertical: 20 * responseHeight
  },
  slideText: {
    alignSelf: 'flex-start',
    fontSize: 20 * responseHeight,
    paddingVertical: 20 * responseHeight
  },
  sliderValueChange: {
    paddingVertical: 20 * responseHeight,
    marginLeft: 'auto',
    fontSize: 20 * responseHeight,
  }
});
