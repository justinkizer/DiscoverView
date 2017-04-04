import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

export default class Map extends React.Component {
  render() {
    return (
      <View style={styles.mapContainer}>
        <Image
          style={styles.mapBackground}
          source={require('./assets/mapBackground.png')}
        ></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: 'transparent'
  },
  mapBackground: {
    flex: 1,
    flexDirection: "column",
    zIndex: -1
  }
});
