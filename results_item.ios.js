import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

export default class ResultsItem extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      <View scrollable={true} scroll={true}>
        <Image style={styles.image} source={{uri: this.props.url}} />
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
  image: {
    width: 250,
    height: 250
  }
});
