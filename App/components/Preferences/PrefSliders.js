'use strict';

import React from 'react';
import { StyleSheet, View, Text, Slider, Image, Platform } from 'react-native';
import MultiSlider from './SliderJS/MultiSlider';

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
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sliders}>
          {/* ----------- DISTANCE SLIDER ----------- */}
          <View style={styles.sliderOne}>
            <Text style={styles.titleText}>Distance</Text>
            <Text style={[styles.sliderValueChange, this.state.sliderOneChanging && {}]}>
              {this.state.sliderOneValue}
              {' miles'}
            </Text>
          </View>
          <MultiSlider
            values={this.state.sliderOneValue}
            sliderLength={280}
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
              height: 3
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
            sliderLength={280}
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
              height: 3
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
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    alignSelf: 'flex-start',
    paddingVertical: 20
  },
  sliderOne: {
    flexDirection: 'row'
  },
  titleText: {
    alignSelf: 'flex-start',
    paddingVertical: 20
  },
  sliderValueChange: {
    paddingVertical: 20,
    marginLeft: 'auto'
  }
});
