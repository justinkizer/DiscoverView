import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.coordinates.latitude,
      longitude: this.props.coordinates.longitude,
      userLatitude: this.props.coordinates.latitude,
      userLongitude: this.props.coordinates.latitude,
      followingIcon: require('./assets/locationNotFollowing.png'),
      currentOrientation: Dimensions.get('window').width <
        Dimensions.get('window').height ? 'landscape' : 'portrait'
    };
    this.changeOrientation = this.changeOrientation.bind(this);
  }

  componentWillMount() {
    if (this.props.userDroppedPin !== null) {
      this.componentWillReceiveProps(this.props);
    } else {
      this.getUserCurrentLocation();
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      latitude: newProps.coordinates.latitude,
      longitude: newProps.coordinates.longitude
    });
    this.snapCoordinates = null;
    if (!newProps.userDroppedPin) {
      this.snapCoordinates = {
        latitude: newProps.coordinates.latitude,
        longitude: newProps.coordinates.longitude,
        latitudeDelta: 0.0093,
        longitudeDelta: 0.0094
      };
    }
  }

  getUserCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.snapCoordinates = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0093,
        longitudeDelta: 0.0094
      };
      this.setState({userLatitude: latitude, userLongitude: longitude});
      }, error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  handleMapPress(coords) {
    if (coords !== 'locationButtonPress' && !this.locationButtonPressed) {
      this.snapCoordinates = null;
      this.setState({latitude: coords.latitude, longitude: coords.longitude});
      this.props.returnCoords({
        coordinates: {
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        userDroppedPin: true
      });
    } else if (coords === 'locationButtonPress') {
      this.locationButtonPressed = true;
      this.setState({followingIcon: require('./assets/locationFollowing.png')});
      this.getUserCurrentLocation();
      setTimeout(() => {
        this.locationButtonPressed = false;
        this.setState({
          followingIcon: require('./assets/locationNotFollowing.png')
        });
        this.snapCoordinates = null;
      }, 1000);
    }
  }

  changeOrientation() {
    if (this.state.currentOrientation === 'portrait') {
      this.followingIconLocation = styles.locationButtonLandscape;
      this.setState({currentOrientation: 'landscape'});
    } else {
      this.followingIconLocation = styles.locationButtonPortrait;
      this.setState({currentOrientation: 'portrait'});
    }
  }

  render() {
    return (
      <View
        style={styles.mapContainer}
        onLayout={this.changeOrientation}
      >
        <MapView
          style={styles.map}
          region={this.snapCoordinates}
          showsUserLocation={true}
          onPress={pin => this.handleMapPress(pin.nativeEvent.coordinate)}
        >
          <MapView.Marker
            draggable={true}
            onDragEnd={pin => this.handleMapPress(pin.nativeEvent.coordinate)}
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          />
        </MapView>

        <TouchableOpacity
          style={this.followingIconLocation}
          onPress={() => this.handleMapPress('locationButtonPress')}
          hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        >
          <Image source={this.state.followingIcon} />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  map: {
    flex: 1
  },
  locationButtonPortrait: {
    bottom: '12%',
    left: '80%'
  },
  locationButtonLandscape: {
    bottom: '20%',
    left: '90%'
  }
});
