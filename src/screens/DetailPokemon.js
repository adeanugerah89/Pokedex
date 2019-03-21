import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class DetailPokemon extends Component {

    getAllAttribute(){
        Alert.alert('Coming Soon');
    }

    render() {
        // console.log('==================',this.props);
        const { navigation } = this.props;
        const detailPokemon = navigation.getParam('detailPokemon');
        return(
            <Card
              title={detailPokemon.name}
              image={{uri: detailPokemon.sprites.front_default}}>
              <Text style={{marginBottom: 10}}> base_experience: {detailPokemon.base_experience} </Text>
              <Text style={{marginBottom: 10}}> height: {detailPokemon.height} </Text>
              <Text style={{marginBottom: 10}}> weight: {detailPokemon.weight} </Text>
              <Button
                onPress={this.getAllAttribute.bind(this)}
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='See All Attribute' />
            </Card>

        )
    }
}

export default DetailPokemon
