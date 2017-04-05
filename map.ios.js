import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {latitude: 37.78825, longitude: -122.4324};
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

  handleMapPress(coords) {
    this.setState({latitude: coords.latitude, longitude: coords.longitude});
    this.props.returnCoords({coordinates:
      {latitude: coords.latitude, longitude: coords.longitude}});
  }

  render() {
    return (
        <MapView
         style={styles.mapContainer}
         showsUserLocation={true}
         followsUserLocation={true}
         onPress={pin => this.handleMapPress(pin.nativeEvent.coordinate)}
        >

        <MapView.Marker
          draggable={true}
          onDragEnd={pin => this.handleMapPress(pin.nativeEvent.coordinate)}
          coordinate={{latitude: this.state.latitude,
            longitude: this.state.longitude}}
        ></MapView.Marker>

        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  }
});
