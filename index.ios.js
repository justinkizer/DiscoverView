import React from 'react';
import { AppRegistry, TabBarIOS } from 'react-native';
import Home from './home.ios.js';
import Map from './map.ios.js';
import Results from './results.ios.js';

export default class DiscoverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabButton: 'home',
      coordinates: {
        latitude: 37.805884,
        longitude: -122.422869
      },
      userDroppedPin: null
    };
    this.update = this.setState.bind(this);
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTabButton}>

        <TabBarIOS.Item
          icon={require('./assets/map.png')}
          onPress={() => this.setState({selectedTabButton: 'map'})}
          selected={this.state.selectedTabButton === 'map'}
        >
          <Map returnCoords={this.update}
            userDroppedPin={this.state.userDroppedPin}
            coordinates={this.state.coordinates}
          />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon={require('./assets/home.png')}
          onPress={() => this.setState({selectedTabButton: 'home'})}
          selected={this.state.selectedTabButton === 'home'}
        >
          <Home shortcutToNearbyPhotos={this.update} />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon={require('./assets/results.png')}
          onPress={() =>
            this.setState({selectedTabButton: 'location'})}
          selected={this.state.selectedTabButton === 'location'}
        >
          <Results goToMap={this.update}
            userDroppedPin={this.state.userDroppedPin}
            coordinates={this.state.coordinates}
          />
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('DiscoverView', () => DiscoverView);
