import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

export default class Map extends React.Component {
  render() {
    return (
      <View style={styles.resultsContainer}>
        <Image
          style={styles.resultsBackground}
          source={require('./assets/photoResultsBackground.png')}
        >
          <Text style={styles.coords}>
            {JSON.stringify(this.props.coordinates)}
          </Text>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: 'transparent'
  },
  resultsBackground: {
    flex: 1,
    flexDirection: "column",
    zIndex: -1
  },
  coords: {
    fontFamily: "Helvetica-Bold",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    fontSize: 20,
    color: "white",
    top: "50%",
    zIndex: 2
  }
});
