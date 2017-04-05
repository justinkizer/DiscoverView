import React from 'react';
import ResultsItem from './results_item.ios.js';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ListView
} from 'react-native';

export default class Results extends React.Component {
  constructor(props){
    super(props);
    this.state = {dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }), loaded: false, accessToken: '4991830679.e029fea.784582c3f64a46088b0b1f124469dd3d', lat: 40.745812, lng: -111.849493, dist: 1000 };
  }


  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(`https://api.instagram.com/v1/media/search?lat=${this.state.lat}&lng=${this.state.lng}&distance=${this.state.dist}&access_token=${this.state.accessToken}`)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.data),
            loaded: true
          });
        });
  }


  photoUrls(){
    if (this.state.data){
      const array = this.state.data;
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
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    console.log("should get here!");
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPhoto}
        style={styles.listview}
        />
    );
  }

  renderLoadingView(){
    return (
      <View style={styles.container}>
        <Text>
          Loading photos...
        </Text>
      </View>
    );
  }

  renderPhoto(photo){
    return (
      <View style={styles.container}>
        <Image
          source={{uri: photo.images.standard_resolution.url}}
          style={styles.photo}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: '#fafafa',
    padding: 10,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#FFF'
  },
  photo: {
    width: 250,
    height: 250,
    borderColor: 'rgba(0,0,0,.09)',
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: 'red',
    shadowOpacity: 1
  }
});
