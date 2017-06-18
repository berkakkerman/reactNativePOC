import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-swipeable';

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
  <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
];

export default class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
   
  }


  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.movies),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20, backgroundColor: 'red'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>  <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
          <Text style={{fontSize: 30}} >{rowData.title} , {rowData.releaseYear}</Text>
        </Swipeable>}/>
        
      </View>
    );
  }
}


