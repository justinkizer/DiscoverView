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
  PanResponder,
  CameraRoll,
  ActionSheetIOS,
  Alert,
  Linking
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
      latitude: null,
      longitude: null,
      modalVisible: false,
      currentOrientation: Dimensions.get('window').width >
        Dimensions.get('window').height ? 'landscape' : 'portrait',
      selectedPhoto: null,
      selectedPhotoCoords: {latitude: null, longitude: null},
      selectedPhotoPage: null,
    };
    this.renderPhoto = this.renderPhoto.bind(this);
    this.goToMap = this.goToMap.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.changeOrientation = this.changeOrientation.bind(this);
    this.photoURLs = [];
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (touchEvent, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderRelease: (touchEvent, gestureState) => {
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

  componentDidMount() {
    this.setState({
      latitude: this.props.coordinates.latitude,
      longitude: this.props.coordinates.longitude
    });
    this.fetchData(this.props.coordinates.latitude,
      this.props.coordinates.longitude);
  }

  fetchData(lat, lng) {
    fetch(`https://api.instagram.com/v1/media/search?lat=${lat}&lng=${lng}` +
      `&distance=${this.state.dist}&count=100&` +
        `access_token=${this.state.accessToken}`)
          .then((response) => response.json())
            .then((responseData) => {
              this.photoURLs = [];
              for (let i = 0; i < responseData.data.length; i++) {
                let photo = responseData.data[i];
                if (photo.location.latitude && photo.location.longitude) {
                    this.photoURLs.push({
                      url: photo.images.standard_resolution.url,
                      latitude: photo.location.latitude,
                      longitude: photo.location.longitude,
                      photoPage: photo.link
                    });
                } else {
                  delete responseData.data[i];
                }
              }
              this.setState({
                dataSource:
                  this.state.dataSource.cloneWithRows(responseData.data),
                loaded: true
              });
            });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.userDroppedPin &&
      newProps.coordinates.latitude !== this.state.latitude
      && newProps.coordinates.longitude !== this.state.longitude) {
        this.setState({
          loaded: false,
          latitude: newProps.coordinates.latitude,
          longitude: newProps.coordinates.longitude
        });
        this.fetchData(newProps.coordinates.latitude,
          newProps.coordinates.longitude);
    }
  }

  modalVisible(visible, url) {
    if (visible) {
      this.index = this.photoURLs.map(photo => photo.url).indexOf(url);
      this.setState({
        modalVisible: visible,
        selectedPhoto: url,
        selectedPhotoCoords: {
          latitude: this.photoURLs[this.index].latitude,
          longitude: this.photoURLs[this.index].longitude
        },
        selectedPhotoPage: this.photoURLs[this.index].photoPage
      });
    } else {
      this.setState({modalVisible: visible});
    }
  }

  nextPhoto() {
    if (this.index + 1 > this.photoURLs.length - 1) {
      this.index = 0;
      this.setState({
        selectedPhoto: this.photoURLs[this.index].url,
        selectedPhotoCoords: {
          latitude: this.photoURLs[this.index].latitude,
          longitude: this.photoURLs[this.index].longitude
        },
        selectedPhotoPage: this.photoURLs[this.index].photoPage
      });
    } else {
      this.index += 1;
      this.setState({
        selectedPhoto: this.photoURLs[this.index].url,
        selectedPhotoCoords: {
          latitude: this.photoURLs[this.index].latitude,
          longitude: this.photoURLs[this.index].longitude
        },
        selectedPhotoPage: this.photoURLs[this.index].photoPage
      });
    }
  }

  previousPhoto() {
    if (this.index - 1 < 0) {
      this.index = this.photoURLs.length - 1;
      this.setState({
        selectedPhoto: this.photoURLs[this.index].url,
        selectedPhotoCoords: {
          latitude: this.photoURLs[this.index].latitude,
          longitude: this.photoURLs[this.index].longitude
        },
        selectedPhotoPage: this.photoURLs[this.index].photoPage
      });
    } else {
      this.index -= 1;
      this.setState({
        selectedPhoto: this.photoURLs[this.index].url,
        selectedPhotoCoords: {
          latitude: this.photoURLs[this.index].latitude,
          longitude: this.photoURLs[this.index].longitude
        },
        selectedPhotoPage: this.photoURLs[this.index].photoPage
      });
    }
  }

  goToMap() {
    this.props.goToMap({
      selectedTabButton: 'map',
      coordinates: {
        latitude: this.state.selectedPhotoCoords.latitude,
        longitude: this.state.selectedPhotoCoords.longitude
      },
      userDroppedPin: false
    });
    this.modalVisible(false);
  }

  savePhoto() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'View on Instagram',
        'Save to Camera Roll',
        'Show on Map',
        'Cancel'
      ],
      cancelButtonIndex: 3
    },
    (buttonPressed) => {
      if (buttonPressed === 0) {
        Linking.openURL(this.state.selectedPhotoPage);
      } else if (buttonPressed === 1) {
        CameraRoll.saveToCameraRoll(this.state.selectedPhoto)
        .then(Alert.alert('Success', 'Photo saved to Camera Roll'));
      } else if (buttonPressed === 2) {
        this.goToMap();
      }
    });
  }

  changeOrientation() {
    this.setState({
      currentOrientation: Dimensions.get('window').width >
        Dimensions.get('window').height ? 'landscape' : 'portrait'
    });
    if (this.state.currentOrientation === 'portrait') {
      this.showOnMapButtonLocation = styles.showOnMapButtonPortrait;
      this.photoFullLocation = styles.photoFullPortrait;
    } else {
      this.showOnMapButtonLocation = styles.showOnMapButtonLandscape;
      this.photoFullLocation = styles.photoFullLandscape;
    }
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else if (this.photoURLs.length === 0) {
      return this.noPhotosFound();
    }

    return (
      <View
        style={styles.background}
        onLayout={this.changeOrientation}
      >
        <ListView
          initialListSize={40}
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
          onOrientationChange={this.changeOrientation}
        >
          <View>
            <View {...this.panResponder.panHandlers}>
              <TouchableHighlight
                onPress={() => this.modalVisible(false)}
                onLongPress={this.savePhoto}
                style={styles.container}
                underlayColor='rgba(255,255,255,0.9)'
              >
                <View
                  style={styles.innerContainer}
                >
                  <Image
                    style={this.photoFullLocation}
                    source={{uri: this.state.selectedPhoto}}
                  >
                    <TouchableOpacity
                      style={this.showOnMapButtonLocation}
                      onPress={this.goToMap}
                      hitSlop={{top: 10, left: 15, bottom: 15, right: 15}}
                    >
                      <Text style={styles.showOnMapText}>
                        Show on Map
                      </Text>
                    </TouchableOpacity>
                  </Image>
                </View>
              </TouchableHighlight>
            </View>

          </View>
        </Modal>
      </View>
    );
  }

  renderLoadingView() {
    let textLocation = this.state.currentOrientation === 'portrait'
      ? styles.textPortrait : styles.textLandscape;

    return (
      <View
        style={styles.list}
        onLayout={this.changeOrientation}
      >
        <Text style={textLocation}>
          Loading photos...
        </Text>
      </View>
    );
  }

  noPhotosFound() {
    let textLocation = this.state.currentOrientation === 'portrait'
      ? styles.textPortrait : styles.textLandscape;

    return (
      <View
        style={styles.list}
        onLayout={this.changeOrientation}
      >
        <Text style={textLocation}>
          No photos found near the selected location
        </Text>
      </View>
    );
  }

  renderPhoto(photo) {
    return (
      <TouchableHighlight
        style={styles.photoBox}
        onPress={() =>
          this.modalVisible(true, photo.images.standard_resolution.url)
        }
      >
        <Image
          source={{uri: photo.images.thumbnail.url}}
          style={styles.photo}
        />
      </TouchableHighlight>
    );
  }
}

let dimensions = Dimensions.get('window').width <
  Dimensions.get('window').height ? Dimensions.get('window').width :
  Dimensions.get('window').height;

const styles = StyleSheet.create({
  photoBox: {
    width: dimensions / 4.4,
    height: dimensions / 4.4,
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
  textPortrait: {
    top: '50%',
    width: '50%',
    fontFamily: 'Helvetica-light',
    fontSize: dimensions / 24,
    textAlign: 'center',
    color: 'gray'
  },
  textLandscape: {
    top: '25%',
    width: '50%',
    fontFamily: 'Helvetica-light',
    fontSize: dimensions / 24,
    textAlign: 'center',
    color: 'gray'
  },
  showOnMapButtonPortrait: {
    position: 'absolute',
    top: (Dimensions.get('window').height / 2) +
      (Dimensions.get('window').width / 2) +
      (Dimensions.get('window').height * 0.01),
    right: -5,
    width: '31%',
    zIndex: 1
  },
  showOnMapButtonLandscape: {
    position: 'absolute',
    top: '92%',
    right: `-${(Dimensions.get('window').width / 2 +
      Dimensions.get('window').height / 2 - Dimensions.get('window').width) *
      0.012}%`,
    width: '25%',
    zIndex: 1
  },
  showOnMapText: {
    fontFamily: 'Helvetica-light',
    fontSize: dimensions * 0.04,
    textAlign: 'center',
    color: 'gray',
    textShadowColor: 'white',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  photo: {
    width: dimensions / 4.4,
    height: dimensions / 4.4,
    borderColor: 'rgba(0,0,0,.09)',
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: 'red',
    shadowOpacity: 1,
    paddingBottom: 10
  },
  photoFullPortrait: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  photoFullLandscape: {
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
