import React from 'react';
import ResultsItem from './results_item.ios.js';

import {
  StyleSheet,
  View,
  Image
} from 'react-native';

export default class Results extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: null, accessToken: '4991830679.e029fea.784582c3f64a46088b0b1f124469dd3d', lat: 40.745812, lng: -111.849493, dist: 1000 };
  }


  componentDidMount(){
    fetch(`https://api.instagram.com/v1/media/search?lat=${this.state.lat}&lng=${this.state.lng}&distance=${this.state.dist}&access_token=${this.state.accessToken}`,
        {method: "GET", dataType: "jsonP"}).then(data => this.setState({data: data}));
  }


  photoUrls(){
    if (this.state.data){
      const array = this.state.data.data;
      let urls = [];
      array.forEach(function(photo){
        urls.push(photo.images.standard_resolution.url);
      });
      return urls;
    } else {
      return [];
    }
  }

  photosArray(){
    const urls = this.photoUrls();
    const collection = urls.map(url => (
      <ResultsItem key={url} url={url} />
    ));
    return collection;
  }



  render() {
    console.log(this.state);
    return (
      <View style={styles.resultsContainer}>
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
