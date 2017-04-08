import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Dimensions,
  PanResponder
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
      currentOrientation: 'unknown',
      selectedPhoto: null,
      selectedPhotoCoords: {latitude: null, longitude: null}
    };
    this.renderPhoto = this.renderPhoto.bind(this);
    this.goToMap = this.goToMap.bind(this);
    this.photoURLs = [];
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 20) {
          this.previousPhoto();
        } else if (gestureState.dx < -20) {
          this.nextPhoto();
        } else {
          this.modalVisible(false);
        }
      }
    });
  }

  componentDidMount(){
    this.fetchData(this.props.coordinates.latitude,
      this.props.coordinates.longitude);
  }

  fetchData(lat, lng){
    fetch(`https://api.instagram.com/v1/media/search?lat=${lat}&lng=${lng}&distance=${this.state.dist}&count=100&access_token=${this.state.accessToken}`)
        .then((response) => response.json())
        .then((responseData) => {
          this.photoURLs = [];
          for (let i = 0; i < responseData.data.length; i++) {
            this.photoURLs.push({url: responseData.data[i]
              .images.standard_resolution.url, latitude: responseData.data[i].location.latitude, longitude: responseData.data[i].location.longitude});
          }
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
    if (visible) {
      this.index = this.photoURLs.map(photo => photo.url).indexOf(url);
      this.setState({modalVisible: visible, selectedPhoto: url, selectedPhotoCoords: {latitude: this.photoURLs[this.index].latitude, longitude: this.photoURLs[this.index].longitude}});
    } else {
      this.setState({modalVisible: visible});
    }
  }

  nextPhoto() {
    if (this.index + 1 > this.photoURLs.length - 1) {
      this.index = 0;
      this.setState({selectedPhoto: this.photoURLs[this.index].url, selectedPhotoCoords: {latitude: this.photoURLs[this.index].latitude, longitude: this.photoURLs[this.index].longitude}});
    } else {
      this.index += 1;
      this.setState({selectedPhoto: this.photoURLs[this.index].url, selectedPhotoCoords: {latitude: this.photoURLs[this.index].latitude, longitude: this.photoURLs[this.index].longitude}});
    }
  }

  previousPhoto() {
    if (this.index - 1 < 0) {
      this.index = this.photoURLs.length - 1;
      this.setState({selectedPhoto: this.photoURLs[this.index].url, selectedPhotoCoords: {latitude: this.photoURLs[this.index].latitude, longitude: this.photoURLs[this.index].longitude}});
    } else {
      this.index -= 1;
      this.setState({selectedPhoto: this.photoURLs[this.index].url, selectedPhotoCoords: {latitude: this.photoURLs[this.index].latitude, longitude: this.photoURLs[this.index].longitude}});
    }
  }

  goToMap() {
    this.props.goToMap({
      selectedTabButton: "map",
      coordinates: {
        latitude: this.state.selectedPhotoCoords.latitude,
        longitude: this.state.selectedPhotoCoords.longitude
      },
      userDroppedPin: false
    });
    this.modalVisible(false);
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    if (this.photoURLs.length === 0) {
      return this.noPhotosFound();
    }

    let showOnMapButtonLocation = this.state.currentOrientation === 'portrait'
      ? styles.showOnMapButtonPortrait : styles.showOnMapButtonLandscape;

    return (
      <View style={styles.background}>
        <ListView
          initialListSize={18}
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
          <View {...this._panResponder.panHandlers}>
          <TouchableHighlight
            onPress={() => this.modalVisible(false)}
            style={styles.container}

          >
            <View
              style={styles.innerContainer}>

              <Image
                style={styles.photoFull}
                source={{uri: this.state.selectedPhoto}}
              >
                <TouchableOpacity
                  style={showOnMapButtonLocation}
                  onPress={this.goToMap}
                >
                  <Text style={styles.showOnMapText}>
                    Show on Map
                  </Text>
                </TouchableOpacity>

              </Image>
            </View>
          </TouchableHighlight>
          </View>
        </Modal>
    </View>
    );
  }

  renderLoadingView(){
    return (
      <View style={styles.list}>
        <Text style={styles.text}>
          Loading photos...
        </Text>
      </View>
    );
  }

  noPhotosFound(){
    return (
      <View style={styles.list}>
        <Text style={styles.text}>
          No photos found near the selected location...
        </Text>
      </View>
    );
  }

  renderPhoto(photo){
    return (
      <TouchableHighlight
        style={styles.photobox}
        onPress={() =>
          this.modalVisible(true, photo.images.standard_resolution.url)}
      >
        <Image
          source={{uri: photo.images.thumbnail.url}}
          style={styles.photo}
        />
      </TouchableHighlight>
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
    justifyContent: 'center',
  },
  background: {
    backgroundColor: '#fafafa',
    height: '100%'
  },
  listView: {
    marginTop: 20,
    marginBottom: 50,
    borderTopColor: 'rgba(0,0,0,.09)',
    borderTopWidth: 2,
    backgroundColor: '#fafafa'
  },
  text: {
    top: '50%',
    width: '50%',
    fontFamily: 'Helvetica-light',
    fontSize: 16,
    textAlign: 'center',
    color: 'gray'
  },
  showOnMapButtonPortrait: {
    top: '79%',
    left: '35%'
  },
  showOnMapButtonLandscape: {
    top: '94%',
    left: '36%'
  },
  showOnMapText: {
    fontFamily: 'Helvetica-light',
    fontSize: 16,
    textAlign: 'center',
    color: 'gray'
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
