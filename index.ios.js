/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Button,
  Image,
  TabBarIOS,
  TabbarIcon,
  TouchableHighlight
} from 'react-native';

export default class DiscoverView extends Component {
  render() {
    return (
      <NavigatorIOS
        navigationBarHidden={true}
        initialRoute={{
          component: SplashScreen,
          title: 'Welcome',
          passProps: {
              title: 'Welcome'
            }
          }
        }
        style={{flex: 1}}
      />
    );
  }
}

const propTypes = {title: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired};

export class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  _onForward() {
    this.props.navigator.push({
      title: 'Scene'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={require('./assets/background.png')}>
        <Text style={styles.welcome}>
          DiscoverView
        </Text>
        <Text style={styles.instructions}>
          Explore what's near you!
        </Text>
        <View style={styles.searchButton}>
          <Button
            onPress={() => console.log("TEST THIS BUTTON!")}
            title={"Find Nearby Photos"}>
          </Button>
        </View>
        <View style={styles.instagramLoginButton}>
          <Button
            onPress={() => console.log("TEST")}
            title={"Instagram Sign In"}>
          </Button>
        </View>

        <TabBarIOS style={styles.tabBar} unselectedTintColor="yellow">
          <TabBarIOS.Item icon={require('./assets/map.png')} onPress={() => console.log("HI!")}></TabBarIOS.Item>
          <TabBarIOS.Item icon={require('./assets/location.png')} onPress={() => console.log("THERE!")}></TabBarIOS.Item>
        </TabBarIOS>
        </Image>
      </View>
    );
  }
}

SplashScreen.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    width: null,
    height: null,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: 'transparent'
  },
  welcome: {
    top: "15%",
    fontSize: 40,
    fontFamily: "Helvetica-Bold",
    color: 'white',
    textShadowColor: "gray",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    textAlign: 'center',
  },
  instructions: {
    top: "17%",
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    left: '0.125%',
    textShadowColor: "gray",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  searchButton: {
    top: "23%",
    left: "25%",
    width: "50%",
    backgroundColor: 'white',
    borderRadius: 300,
    zIndex: 1
  },
  instagramLoginButton: {
    top: "25%",
    left: "25%",
    width: "50%",
    backgroundColor: 'white',
    borderRadius: 300,
    zIndex: 1
  },
  background: {
    flex: 1,
    flexDirection: "column",
    zIndex: -1
  },
  tabBar: {
    zIndex: 0
  }
});

AppRegistry.registerComponent('DiscoverView', () => DiscoverView);
