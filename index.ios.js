import React from 'react';
import { AppRegistry, TabBarIOS } from 'react-native';
import Home from './home.ios.js';
import Map from './map.ios.js';
import Results from './results.ios.js';

export default class DiscoverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedTabButton: "home",
      coordinates: {latitude: 37.78825, longitude: -122.4324}};
    this.update = this.setState.bind(this);
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTabButton}>

        <TabBarIOS.Item
          icon={require('./assets/map.png')}
          onPress={() => this.setState({selectedTabButton: "map"})}
          selected={this.state.selectedTabButton === 'map'}
        >
          <Map returnCoords={this.update} />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="search"
          onPress={() => this.setState({selectedTabButton: "home"})}
          selected={this.state.selectedTabButton === 'home'}
        >
          <Home />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon={require('./assets/location.png')}
          onPress={() =>
            this.setState({selectedTabButton: "location"})}
          selected={this.state.selectedTabButton === 'location'}
        >
          <Results coordinates={this.state.coordinates}/>
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('DiscoverView', () => DiscoverView);
