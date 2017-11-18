import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage, Dimensions, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const SPARK_WIDTH = Dimensions.get('window').width;

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
          //  AsyncStorage.removeItem('fb_token', (err) => console.log('finished', err));
            return (
              
                <View style={styles.container}>
                  <Image 
                  resizeMode='contain'
                  source={require('../images/sparkLogo.png')} style={{width: 310 * responseWidth }}/>
                  {/* <Image source={require('../images/Spark.png')} style={{width: 140, height: 150, marginLeft: 50 }}/> */}
                  <Button 
                  title="Login" 
                  raised buttonStyle={styles.buttonStyle} 
                  onPress={this.props.onComplete}
                  />
                </View>
                
            );
        }
         else if (index === this.props.data.length - 2) {
          return (
            <View style={styles.container}>
              <Text style={styles.textStyle} >Girls Rate the Guys</Text>
              <Image 
              resizeMode='contain'
              source={require('../images/RatingShot.png')} style={{ marginTop: 25 * responseHeight, height: 320 * responseHeight  }}/>
            </View>  
          );
        }
        // else if (index === this.props.data.length - 3) {
        //   return (
        //     <View style={styles.container}>
        //       <Text style={styles.textStyle} >Guys Message First</Text>
        //       <Image 
        //       resizeMode='contain'
        //       source={require('../images/MessageShot.png')} style={{ marginTop: 25, height: 320 }}/>
        //     </View>  
        //   );
        // }
          else if (index === this.props.data.length - 3) {
          return (
            <View style={styles.container}>  
              <Text style={styles.textStyle}>Find Your Match</Text>
              <Image 
              resizeMode='contain'
              source={require('../images/SparkScreen.png')} style={{ marginTop: 25 * responseHeight, height: 320 * responseHeight }}/>
            </View>  
        );
    }
        return (
          <View style={styles.container}>  
          <Text style={styles.textStyle}>Welcome to Spark</Text>
          {/* <Text style={styles.swipeStyle}>Start Swiping</Text> */}
          <Icon
              name={'ios-arrow-round-back-outline'}
              type={'ionicon'}
              color={'#34799b'}
              underlayColor={'white'}
              iconStyle={{ marginRight: 10 * responseWidth }}
              size={70 * responseHeight}
          />
          {/* <Image 
          resizeMode='contain'
          source={require('../images/welcomeSecond.png')} style={{ marginTop: 25, height: 300 }}/> */}
        </View> 
        )
  }
    renderSlides() {
        return this.props.data.map((slide, index) => {
          console.log('index', index);
            return (
            <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
                <Text style={styles.welcomeTextStyle}>{slide.text}</Text>
                {this.renderLastSlide(index)}
            </View>
        );
    });
}

render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SPARK_WIDTH
  },
  textStyle: {
    fontSize: 30 * responseHeight,
    color: '#34799b'
  },
  swipeStyle: {
    fontSize: 24 * responseHeight,
    color: '#34799b',
    marginTop: 40 * responseHeight
  },
  welcomeTextStyle: {
    fontSize: 30 * responseHeight,
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
},
  buttonStyle: {
    backgroundColor: '#34799b',
    marginTop: 15 * responseHeight,
    width: 100 * responseWidth
  }
};

export default Slides;




// import React, { Component } from 'react';
// import { View, Text, ScrollView, Dimensions } from 'react-native';
// import { Button } from 'react-native-elements';

// const SPARK_WIDTH = Dimensions.get('window').width;

// class Slides extends Component {
//     renderLastSlide(index) {
//         if (index === this.props.data.length - 1) {
//             return (
//               <Image source={require('../../../App/images/bg.jpg')} style={styles.backgroundImage}>
//               <View style={styles.container}>
                  
//                   <Text style={styles.welcome}>
//                       Gents
//                   </Text>
  
//                   <Image source={require('../../../App/images/gents.png')} style={{width: 193, height: 200}}/>
  
//                   <Text style={styles.instructions}>
//                       Date with class.
//                   </Text>
  
//                   <Text style={styles.instructions}>
//                       Example new line,{'\n'}
//                   </Text>
  
//                   <LoginButton />
                  
//               </View>
//               </Image>)
//                 <Button 
//                 title="Login To Spark" 
//                 raised buttonStyle={styles.buttonStyle} 
//                 onPress={this.props.onComplete} 
//                 />
//             );
//         }
//     }

//     renderSlides() {
//         return this.props.data.map((slide, index) => {
//             return (
//             <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
//                 <Text style={styles.textStyle}>{slide.text}</Text>
//                 {this.renderLastSlide(index)}
//             </View>
//         );
//     });
// }

// render() {
//     return (
//       <ScrollView
//         horizontal
//         style={{ flex: 1 }}
//         pagingEnabled
//       >
//         {this.renderSlides()}
//       </ScrollView>
//     );
//   }
// }

// const styles = {
//   slideStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: SPARK_WIDTH
//   },
//   textStyle: {
//     fontSize: 30,
//     color: 'white'
//   },
//   buttonStyle: {
//     backgroundColor: '#0288D1',
//     marginTop: 15
//   },
//   instructions: {
//     textAlign: 'center',
//     color: 'white',
//     backgroundColor: 'rgba(0,0,0,0)',
//     marginBottom: 5,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     color: 'white',
//     backgroundColor: 'rgba(0,0,0,0)',
//     margin: 10,
//   },
// };

// export default Slides;
