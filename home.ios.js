import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

export default class Home extends React.Component {
  render() {
    return (

      <View style={styles.homeContainer}>

        <Image
          style={styles.background}
          source={require('./assets/background.png')}
        >

          <Text style={styles.appName}>
            DiscoverView
          </Text>

          <Text style={styles.appNameTagLine}>
            Explore what's near you!
          </Text>

          <View style={styles.searchButton}>
            <Button
              onPress={() => console.log("TEST THIS BUTTON!")}
              title={"Find Nearby Photos"}
            ></Button>
          </View>

          <View style={styles.instagramLoginButton}>
            <Button
              onPress={() => console.log("TEST")}
              title={"Instagram Sign In"}
            ></Button>
          </View>

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: 'transparent'
  },
  appName: {
    top: "15%",
    fontSize: 40,
    fontFamily: "Helvetica-Bold",
    color: 'white',
    textShadowColor: "gray",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    textAlign: 'center'
  },
  appNameTagLine: {
    top: "17%",
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    left: '0.125%',
    textShadowColor: "gray",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
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
  }
});
