import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TabBarIOS,
  TabbarIcon
} from 'react-native';
import Home from './home.ios.js';
import Map from './map.ios.js';
import Results from './results.ios.js';

export default class DiscoverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedTabButton: "home"};
  }
  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTabButton}>

        <TabBarIOS.Item
          icon={require('./assets/map.png')}
          onPress={() => this.setState({selectedTabButton: "map"})}
          selected={this.state.selectedTabButton === 'map'}
        >
          <Map />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          systemIcon="history"
          onPress={() => this.setState({selectedTabButton: "home"})}
          selected={this.state.selectedTabButton === 'home'}
        >
          <Home />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon={require('./assets/location.png')}
          onPress={() => this.setState({selectedTabButton: "location"})}
          selected={this.state.selectedTabButton === 'location'}
        >
          <Results/>
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('DiscoverView', () => DiscoverView);
