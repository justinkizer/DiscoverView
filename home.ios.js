import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.shortcutToNearbyPhotos = this.shortcutToNearbyPhotos.bind(this);
  }

  shortcutToNearbyPhotos() {
    navigator.geolocation.getCurrentPosition(position => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.props.shortcutToNearbyPhotos({selectedTabButton: "location",
        coordinates: {latitude: latitude, longitude: longitude}});
      }, error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

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

          <TouchableOpacity style={styles.searchButton} onPress={this.shortcutToNearbyPhotos}>

              <Text style={styles.searchButtonText}>Find Nearby Photos</Text>

          </TouchableOpacity>

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
    top: "22%",
    left: "25%",
    width: "50%",
    backgroundColor: 'white',
    borderWidth: 6,
    borderColor: 'white',
    borderRadius: 30,
    zIndex: 1
  },
  searchButtonText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#157efb',
  },
  background: {
    flex: 1,
    flexDirection: "column",
    zIndex: -1
  }
});
