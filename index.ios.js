/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  PixelRatio,
  TouchableHighlight
} from 'react-native';

export default class DiscoverView extends Component {
  render() {
    return (
      <Image style={styles.container}
        source={require('./assets/background.png')}>
        <Text style={styles.welcome}>
          DiscoverView
        </Text>
        <Text style={styles.welcome2}>
          DiscoverView
        </Text>
        <Text style={styles.instructions}>
          Explore the incredible near you!
        </Text>
        <Text style={styles.instructions2}>
          Explore the incredible near you!
        </Text>
        <View style={styles.searchButton}>
          <Button
            overrides={{backgroundColor: 'transparent'}}
            onPress={() => console.log("TEST")}
            title={"Find Nearby Photos"}>
          </Button>
        </View>
        <Button style={styles.instagramLoginButton}
          onPress={() => console.log("TEST")}
          title={"Instagram Sign In"}>
        </Button>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  welcome: {
    top: '-14.85%',
    fontSize: 40,
    fontFamily: "Helvetica-Bold",
    color: 'gray',
    textAlign: 'center',
    margin: 10,
  },
  welcome2: {
    top: '-25%',
    fontSize: 40,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5,
    top: '-24.65%',
    left: '0.125%'
  },
  instructions2: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    top: '-29%',
  },
  searchButton: {
    marginBottom: 5,
    top: '-23%',
    backgroundColor: 'white',
    borderRadius: 300 / PixelRatio.get()
  },
  instagramLoginButton: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    top: '-29%',
  },
});

AppRegistry.registerComponent('DiscoverView', () => DiscoverView);
