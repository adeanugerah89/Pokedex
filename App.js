import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import ListPokemon from './src/screens/ListPokemon';
import DetailPokemon from './src/screens/DetailPokemon';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const AppStack = createStackNavigator({
  ListPokemon: {
    path: 'ListPokemon',
    screen: ListPokemon,
    navigationOptions: {
      header: null
    }
  },
  DetailPokemon: {
    path: 'DetailPokemon',
    screen: DetailPokemon
  }
})

const AppContainer = createAppContainer(AppStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
