import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrientation: 'unknown'
    };
    this.changeOrientation = this.changeOrientation.bind(this);
  }

  shortcutToNearbyPhotos() {
    navigator.geolocation.getCurrentPosition(position => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.props.shortcutToNearbyPhotos({
        selectedTabButton: 'location',
        userDroppedPin: true,
        coordinates: {
          latitude: latitude,
          longitude: longitude
        }
      });
      }, error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  changeOrientation() {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.searchButtonStyle = styles.searchButtonPortrait;
      this.backgroundImage = require('./assets/background.png');
      this.setState({currentOrientation: 'portrait'});
    } else {
      this.searchButtonStyle = styles.searchButtonLandscape;
      this.backgroundImage = require('./assets/landscapeBackground.png');
      this.setState({currentOrientation: 'landscape'});
    }
  }

  render() {
    return (
      <View
        style={styles.homeContainer}
        onLayout={this.changeOrientation}
      >
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
            style={this.searchButtonStyle}
            onPress={() => this.shortcutToNearbyPhotos()}
          >
            <Text style={styles.searchButtonText}>
              Find Nearby Photos
            </Text>
          </TouchableOpacity>

        </Image>
      </View>
    );
  }
}

let smallerDimension = Dimensions.get('window').width <
  Dimensions.get('window').height ? Dimensions.get('window').width :
  Dimensions.get('window').height;

let largerDimension = Dimensions.get('window').width >
  Dimensions.get('window').height ? Dimensions.get('window').width :
  Dimensions.get('window').height;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  appName: {
    top: '15%',
    fontSize: smallerDimension / 10,
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
    fontSize: smallerDimension / 20,
    textAlign: 'center',
    color: 'white',
    left: '0.125%',
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  searchButtonPortrait: {
    top: '22%',
    left: '25%',
    width: '48%',
    backgroundColor: 'white',
    borderWidth: 7,
    borderColor: 'white',
    borderRadius: 30,
    zIndex: 1
  },
  searchButtonLandscape: {
    top: '22%',
    left: (largerDimension / 2) - ((smallerDimension / 2.1) / 1.95),
    width: smallerDimension / 2.1,
    backgroundColor: 'white',
    borderWidth: 7,
    borderColor: 'white',
    borderRadius: 30,
    zIndex: 1
  },
  searchButtonText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: smallerDimension / 24,
    textAlign: 'center',
    color: '#157efb'
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    zIndex: -1,
    width: '100%'
  }
});
