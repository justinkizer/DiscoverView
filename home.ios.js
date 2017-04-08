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
    this.state = {currentOrientation: 'unknown'};
    this.shortcutToNearbyPhotos = this.shortcutToNearbyPhotos.bind(this);
    this.changeBackground = this.changeBackground.bind(this);
  }

  shortcutToNearbyPhotos() {
    navigator.geolocation.getCurrentPosition(position => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.props.shortcutToNearbyPhotos({selectedTabButton: 'location',
        coordinates: {latitude: latitude, longitude: longitude}});
      }, error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  changeBackground() {
    if (this.state.currentOrientation === 'portrait') {
      this.backgroundImage = require('./assets/landscapeBackground.png');
      this.setState({currentOrientation: 'landscape'});
    } else {
      this.backgroundImage = require('./assets/background.png');
      this.setState({currentOrientation: 'portrait'});
    }
  }

  render() {
    return (

      <View style={styles.homeContainer} onLayout={this.changeBackground}>

        <Image
          style={styles.background}
          source={this.backgroundImage}
        >

          <Text style={styles.appName}>
            DiscoverView
          </Text>

          <Text style={styles.appNameTagLine}>
            Explore what's near you!
          </Text>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.shortcutToNearbyPhotos}
          >
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
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  appName: {
    top: '15%',
    fontSize: 40,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    textAlign: 'center'
  },
  appNameTagLine: {
    top: '17%',
    fontFamily: 'Helvetica-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    left: '0.125%',
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  searchButton: {
    top: '22%',
    left: '22%',
    width: '57%',
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
    flexDirection: 'column',
    zIndex: -1,
    width: '100%'
  }
});
