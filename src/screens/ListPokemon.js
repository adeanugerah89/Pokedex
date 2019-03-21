import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { ListItem, SearchBar, Button, Icon, Col, ButtonGroup } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'


class ListPokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            offset: 0,
            loading: true,
            error: null,
            selectedIndex: 1,
            buttons: ['fighting', 'dragon', 'fire']
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        const { buttons, data } = this.state
        let pokemonType = buttons[selectedIndex]
        axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`)
        .then(response => {
            let dataType = response.data.pokemon.map(val => val.pokemon)
            // console.log('===================',dataType);
            this.setState({
                data: [...dataType],
                loading: false,
                error: null,
            })
        })
        .catch(err => this.setState({ loading: true, error }))
        this.setState({selectedIndex})
    }

    componentDidMount() {
        this.getAllPokemon();
    }

    async getAllPokemon() {
        const { offset } = this.state
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
            const json = await response.data.results;
            // console.log('===========1', json);
            this.setState({
                data: [...this.state.data ,...json],
                loading: false,
                error: json.error || null,
            })
        } catch (error) {
            this.setState({ loading: true, error })
        }
    }

    renderSeparator(){
        return (
            <View style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "grey",
                    marginLeft: "14%"
                }} />
        )
    }

    handleLoadMore() {
        this.setState({
            offset: this.state.offset + 10
        }, () => { this.getAllPokemon() })
    }

    async getDetailPokemon(url) {
        try {
            const response = await axios.get(url)
            const json = await response.data
            this.props.navigation.navigate('DetailPokemon', { detailPokemon: json });
        } catch (error) {
            this.setState({ loading: true, error })
        }

    }

    renderItem = ({ item }) => (
          <View>
              <ListItem
                rightIcon={<Icon name={'play-circle-filled'} size={30} onPress={() => this.getDetailPokemon(item.url)} />}
                title={item.name}
                leftAvatar={{ source: require('/home/adeanugerah/Documents/latihan/Pokedex/img/ball.png') }}
              />
          </View>
        )

    render(){
        const { loading, data, buttons, selectedIndex } = this.state
        if(!loading) {
            return (
                <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={{flex: 1, marginTop: 30}}>
                        <ButtonGroup
                          onPress={this.updateIndex}
                          selectedIndex={selectedIndex}
                          buttons={buttons}
                          containerStyle={{height: 50}}
                        />

                        <FlatList
                          data={data}
                          renderItem={this.renderItem}
                          keyExtractor={(item, index) => index.toString()}
                          ItemSeparatorComponent={this.renderSeparator.bind(this)}
                          onEndReached={this.handleLoadMore.bind(this)}
                          onEndReachedThreshold={0.5}
                        />
                    </View>
                </SafeAreaView>
            )
        } else {
            return(
                  <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
            )
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default ListPokemon
