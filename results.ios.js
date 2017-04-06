import React from 'react';
import ResultsItem from './results_item.ios.js';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';

export default class Results extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,}),
      loaded: false,
      accessToken: '4991830679.e029fea.784582c3f64a46088b0b1f124469dd3d',
      dist: 500,
      modalVisible: false,
      selectedSupportedOrientation: 0,
      currentOrientation: 'unknown',
      selectedPhoto: null
    };
    this.renderPhoto = this.renderPhoto.bind(this);
  }

  componentDidMount(){
    this.fetchData(this.props.coordinates.latitude,
      this.props.coordinates.longitude);
  }

  fetchData(lat, lng){
    fetch(`https://api.instagram.com/v1/media/search?lat=${lat}&lng=${lng}&distance=${this.state.dist}&access_token=${this.state.accessToken}`)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.data),
            loaded: true
          });
        });
  }

  componentWillReceiveProps(newProps){
    this.setState({loaded: false});
    this.fetchData(newProps.coordinates.latitude,
      newProps.coordinates.longitude);
  }

  modalVisible(visible, url) {
    this.setState({modalVisible: visible, selectedPhoto: url});
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.list}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderPhoto}
          style={styles.listView}
          contentContainerStyle={styles.list}
        />

        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.modalVisible(false)}
          supportedOrientations={['portrait', 'landscape']}
          onOrientationChange={evt =>
            this.setState({currentOrientation: evt.nativeEvent.orientation})}
        >
          <TouchableOpacity
            onPress={() => this.modalVisible(false)}
            style={styles.container}
          >
            <View
              style={styles.innerContainer}>

              <Image
                style={styles.photoFull}
                source={{uri: this.state.selectedPhoto}}
              />

            </View>
          </TouchableOpacity>
        </Modal>
    </View>
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
      <TouchableOpacity
        style={styles.photobox}
        onPress={() =>
          this.modalVisible(true, photo.images.standard_resolution.url)}
      >
        <Image
          source={{uri: photo.images.standard_resolution.url}}
          style={styles.photo}
        />
      </TouchableOpacity>
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
    margin: 3
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  listView: {
    marginTop: 20,
    marginBottom: 50,
    borderTopColor: 'rgba(0,0,0,.09)',
    borderTopWidth: 2,
    backgroundColor: '#fafafa'
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
  },
  photoFull: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  container: {
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#0000'
  },
});
