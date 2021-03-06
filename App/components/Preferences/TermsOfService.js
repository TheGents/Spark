import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';

const { height, width } = Dimensions.get('window');
const responseHeight = Math.round(height / 667);
const responseWidth = Math.round(width / 375);
// want stack

class TermsOfService extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View>
        <LinearGradient
          // colors={['#ffffff', '#fffffd', '#dddfdd']}
          colors={['#91c1ef', '#91c1ed', '#9ac1ed']}
          style={styles.nav}
        >
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Preferences');
            }}
            name={'md-settings'}
            type={'ionicon'}
            color={'white'}
            size={37}
            underlayColor={'white'}
            iconStyle={{ 
              marginLeft: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.9,
              shadowRadius: 1 
            }}
          />
          <Text>{'         '}</Text>
          <Text>{'         '}</Text>
        </LinearGradient>
        </View>
        
        <ScrollView style={styles.termsLegalese}>
          <Text style={styles.heading}>Dallas Spark Terms and Conditions of Use{'\n'}</Text>
          <Text>
          End-User License Agreement for Dallas Spark
          
          This End-User License Agreement (EULA) is a legal agreement between you (either an individual or a single entity) and the mentioned author (Dallas Spark) of this application for the software product identified above. 
          
          By installing, copying, or otherwise using this application, you agree to be bounded by the terms of this EULA.
          If you do not agree to the terms of this EULA, do not install or use the SOFTWARE PRODUCT.
          
          SOFTWARE PRODUCT LICENSE
          Dallas Spark is being distributed as Freeware for personal use.
          
          1. GRANT OF LICENSE. This EULA grants you the following rights: Installation and Use. 
          
          Rights Dallas Spark Grants You.
          Dallas Spark grants you a personal, worldwide, royalty-free, non-assignable, nonexclusive, revocable, and non-sublicensable license to access and use the Services. This license is for the sole purpose of letting you use and enjoy the Services’ benefits as intended by Dallas Spark and permitted by this Agreement. Therefore, you agree not to:
          use the Service or any content contained in the Service for any commercial purposes without our written consent.
          copy, modify, transmit, create any derivative works from, make use of, or reproduce in any way any copyrighted material, images, trademarks, trade names, service marks, or other intellectual property, content or proprietary information accessible through the Service without Dallas Spark’s prior written consent.
          express or imply that any statements you make are endorsed by Dallas Spark.
          use any robot, bot, spider, crawler, scraper, site search/retrieval application, proxy or other manual or automatic device, method or process to access, retrieve, index, “data mine,” or in any way reproduce or circumvent the navigational structure or presentation of the Service or its contents.
          use the Services in any way that could interfere with, disrupt or negatively affect the Service or the servers or networks connected to the Service.
          upload viruses or other malicious code or otherwise compromise the security of the Services.
          forge headers or otherwise manipulate identifiers in order to disguise the origin of any information transmitted to or through the Service.
          “frame” or “mirror” any part of the Service without Dallas Spark prior written authorization.
          use meta tags or code or other devices containing any reference to Dallas Spark or the Service (or any trademark, trade name, service mark, logo or slogan of Dallas Spark) to direct any person to any other website for any purpose.
          modify, adapt, sublicense, translate, sell, reverse engineer, decipher, decompile or otherwise disassemble any portion of the Service, or cause others to do so.
          use or develop any third-party applications that interact with the Services or other users’ Content or information without our written consent.
          use, access, or publish the Dallas Spark application programming interface without our written consent.
          probe, scan or test the vulnerability of our Services or any system or network.
          encourage or promote any activity that violates this Agreement.

          5. Community Rules. 
          By using the Services, you agree that you will not:
          use the Service for any purpose that is illegal or prohibited by this Agreement.
          spam, solicit money from or defraud any users.
          impersonate any person or entity or post any images of another person without his or her permission.
          bully, “stalk,” intimidate, harass or defame any person.
          post any Content that violates or infringes anyone’s rights, including rights of publicity, privacy, copyright, trademark or other intellectual property or contract right.
          post any Content that is hate speech, threatening, sexually explicit or pornographic; incites violence; or contains nudity or graphic or gratuitous violence.
          post any Content that promotes racism, bigotry, hatred or physical harm of any kind against any group or individual.
          solicit passwords for any purpose, or personal identifying information for commercial or unlawful purposes from other users or disseminate another person’s personal information without his or her permission.
          use another user’s account.
          create another account if we have already terminated your account, unless you have our permission.
          Dallas Spark reserves the right to investigate and/ or terminate your account without a refund of any purchases if you have misused the Service or behaved in a way that Dallas Spark regards as inappropriate or unlawful, including actions or communications that occur off the Service but involve users you meet through the Service.

          6. Indemnity by You.
          You agree, to the extent permitted under applicable law, to indemnify, defend and hold harmless Dallas Spark, our affiliates, and their and our respective officers, directors, agents, and employees from and against any and all complaints, demands, claims, damages, losses, costs, liabilities and expenses, including attorney’s fees, due to, arising out of, or relating in any way to your access to or use of the Services, your Content, or your breach of this Agreement.
          
          7. Entire Agreement; Other.
          This Agreement, with the Privacy Policy, the Safety Tips and any terms disclosed and agreed to by you if you purchase additional features, products or services we offer on the Service, contains the entire agreement between you and Dallas Spark regarding the use of the Service. If any provision of this Agreement is held invalid, the remainder of this Agreement shall continue in full force and effect. The failure of the Company to exercise or enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision. You agree that your Dallas Spark account is non-transferable and all of your rights to your account and its Content terminate upon your death. No agency, partnership, joint venture or employment is created as a result of this Agreement and you may not make any representations or bind Dallas Spark in any manner.{'\n'}
          </Text>
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%'
  },
  heading: {
    fontWeight: '900'
  },
  nav: {
    height: height / 8.114,
    flexDirection: 'row',
    paddingTop: 10 * responseHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(9,9,9,0.3)',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
  },
  termsLegalese: {
    marginTop: 20
  }
});

export default TermsOfService;
