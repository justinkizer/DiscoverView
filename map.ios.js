import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View
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
      followingLocation: false,
      currentOrientation: 'unknown'
    };
    this.changeLocationButtonStyle = this.changeLocationButtonStyle.bind(this);
  }

  componentWillMount() {
    this.getUserCurrentLocation();
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
    if (coords !== "locationButtonPress" && !this.locationButtonPressed) {
      this.snapCoordinates = null;
      this.setState({latitude: coords.latitude, longitude: coords.longitude});
      this.props.returnCoords({
        coordinates: {
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        userDroppedPin: true
      });
    } else if (coords === "locationButtonPress") {
      this.locationButtonPressed = true;
      this.setState({followingLocation: !this.state.followingLocation});
      this.getUserCurrentLocation();
      setTimeout(() => {
        this.locationButtonPressed = false;
        this.setState({followingLocation: !this.state.followingLocation});
        this.snapCoordinates = null;
      }, 1000);
    }
  }

  changeLocationButtonStyle() {
    if (this.state.currentOrientation === 'portrait') {
      this.backgroundImage = require('./assets/landscapeBackground.png');
      this.setState({currentOrientation: 'landscape'});
    } else {
      this.backgroundImage = require('./assets/background.png');
      this.setState({currentOrientation: 'portrait'});
    }
  }

  render() {

    let followingIconLocation = this.state.currentOrientation === 'portrait'
      ? styles.locationButtonPortrait : styles.locationButtonLandscape;

    let followingIcon = this.state.followingLocation ?
      require('./assets/locationFollowing.png') :
      require('./assets/locationNotFollowing.png');

    return (
      <View style={styles.mapContainer} onLayout={this.changeLocationButtonStyle}>
        <MapView
          style={styles.map}
          region={this.snapCoordinates}
          showsUserLocation={true}
          onPress={pin => this.handleMapPress(pin.nativeEvent.coordinate)}
        >
          <MapView.Marker
              draggable={true}
              onDragEnd={pin => this.handleMapPress(pin.nativeEvent.coordinate)}
              coordinate={{latitude: this.state.latitude,
                longitude: this.state.longitude}}
          ></MapView.Marker>

        </MapView>

        <TouchableOpacity
          style={followingIconLocation}
          onPress={() => this.handleMapPress("locationButtonPress")}
        >
          <Image source={followingIcon}/>
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
