import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

export default class Map extends React.Component {
  render() {
    return (
      <View style={styles.resultsContainer}>
        <Image
          style={styles.resultsBackground}
          source={require('./assets/photoResultsBackground.png')}
        ></Image>
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
  }
});
