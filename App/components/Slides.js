import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';

const SPARK_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
              
                <View style={styles.container}>
                <Image source={require('../images/gents.png')} style={{width: 193, height: 200}}/>
                <Button 
                title="Login To Gent" 
                raised buttonStyle={styles.buttonStyle} 
                onPress={this.props.onComplete}
                />
                </View>
               
                
            );
        }
         else if (index === this.props.data.length - 2){
          return(
            <Image source={require('../images/sparkGent.jpg')} style={{width: 193, height: 200}}/>
          );
        }
        return(
          <Image source={require('../images/welcomeSpark.png')} style={{width: 193, height: 200}}/>
        );
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
            <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
                <Text style={styles.textStyle}>{slide.text}</Text>
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
    fontSize: 30,
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
    backgroundColor: '#0288D1',
    marginTop: 15
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
