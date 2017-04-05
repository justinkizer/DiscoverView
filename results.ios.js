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
    }), loaded: false, accessToken: '4991830679.e029fea.784582c3f64a46088b0b1f124469dd3d', dist: 500 };
  }


  componentDidMount(){
    this.fetchData(this.props.coordinates.latitude, this.props.coordinates.longitude);
  }

  fetchData(lat, lng){
    fetch(`https://api.instagram.com/v1/media/search?lat=${lat}&lng=${lng}&distance=${this.state.dist}&access_token=${this.state.accessToken}`)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.data),
            loaded: true
          });
        });
  }

  componentWillReceiveProps(newProps){
    this.setState({loaded: false});
    this.fetchData(newProps.coordinates.latitude, newProps.coordinates.longitude);
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPhoto}
        style={styles.listView}
        contentContainerStyle={styles.list}
        />
    );
  }

  renderLoadingView(){
    return (
      <View style={styles.photobox}>
        <Text style={styles.text}>
          Loading photos...
        </Text>
      </View>
    );
  }

  renderPhoto(photo){
    return (
      <View style={styles.photobox}>
        <Image
          source={{uri: photo.images.standard_resolution.url}}
          style={styles.photo}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photobox: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    margin: 3,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  listView: {
    marginTop: 20,
    marginBottom: 50,
    borderTopColor: 'rgba(0,0,0,.09)',
    borderTopWidth: 2,
    backgroundColor: '#fafafa',
  },
  text: {
    marginTop: 100
  },
  photo: {
    width: 100,
    height: 100,
    borderColor: 'rgba(0,0,0,.09)',
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: 'red',
    shadowOpacity: 1,
    paddingBottom: 10
  }
});
