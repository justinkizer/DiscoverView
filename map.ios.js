import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {latitude: 37.78825, longitude: -122.4324,
      followingLocation: true
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      this.setState({latitude: latitude, longitude: longitude});
      }, error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentDidMount() {
    setTimeout(() => this.setState({followingLocation: false}), 1500);
  }

  handleMapPress(coords) {
    if (coords !== "locationButtonPress" && !this.locationButtonPressed) {
      this.setState({latitude: coords.latitude, longitude: coords.longitude});
      this.props.returnCoords({coordinates:
        {latitude: coords.latitude, longitude: coords.longitude}});
    } else if (coords === "locationButtonPress") {
      this.locationButtonPressed = true;
      this.setState({followingLocation: !this.state.followingLocation});
      setTimeout(() => {this.locationButtonPressed = false;}, 50);
    }
  }

  render() {
    let followingIcon = this.state.followingLocation ?
      require('./assets/locationFollowing.png') :
      require('./assets/locationNotFollowing.png');

    return (
      <View style={styles.mapContainer}>
        <MapView
         style={styles.map}
         showsUserLocation={true}
         followsUserLocation={this.state.followingLocation}
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
          style={styles.locationButton}
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
  locationButton: {
    bottom: '13%',
    left: '80%'
  }
});
