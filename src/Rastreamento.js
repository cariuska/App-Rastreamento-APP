import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button, View, TouchableHighlight, ScrollView, FlatList } from 'react-native';

import Header from './Header';
import { GetUser, GetObjectId, CreateObject, UpdateObject, GetAllObject } from './DataBase';

import Axios from './Axios';


class Rastreamento extends React.Component {

    state = {
        objects: []
    }


    onPressDet = (idObject) => {
        this.props.navigation.navigate('RastreamentoDet', { idObject: idObject } )
    }

    buscaObjects = () => {

        var user = GetUser();

        Axios.get(`object`, { 'headers': { 'token': user['token'] } })
            .then(res => {
                const lista = res.data;
                
                lista.forEach(item => {

                    const idObject = item["idObject"];
                    const idUser = item["idUser"];
                    const objectCode = item["objectCode"];
                    const description = item["description"];
                    const dateRegister = item["dateRegister"];
                    const status = item["status"];

                    const object = GetObjectId(idObject);

                    if (object === undefined){
                        CreateObject(idObject, idUser, objectCode, description, dateRegister, status);
                    }else{
                        UpdateObject(idObject, idUser, objectCode, description, dateRegister, status);
                    }

                    Axios.get(`objectlocation/${idObject}`, { 'headers': { 'token': user['token'] } })
                    .then(res => {
                        const listaDet = res.data;

                        console.warn(listaDet.length);

                    });



                });
            
                this.carregaObjects();

            })
    }

    carregaObjects = () => {

        const objects = GetAllObject();
        this.setState({ objects })

    }

    componentDidMount(){
        this.buscaObjects();
    }

    
    renderItem = ({ item }) => (
        
        <TouchableHighlight
            onPress={() => this.onPressDet(item.idObject)}
            style={styles.item}
        >
            <Text>{item.idObject} - {item.description} - {item.status}</Text>
        </TouchableHighlight>
    );



    render(){

        const { objects } = this.state;

        return (
            <>
                <Header title={"Rastreamento"} navigation={this.props.navigation} right detination="RastreamentoAdd" />
                <SafeAreaView style={styles.view}>
                    <FlatList 
                        data={objects}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.idObject}
                    />
                </SafeAreaView>
                <View style={styles.adsense}>
                    <Text>Propaganda</Text>
                </View>
            </>
        )
    }
};    

const styles = StyleSheet.create({
    adsense:{
        height: 70,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "gray"
    },
    view: {
        flex: 1,
        marginTop: 5,
    },
    item: {
        borderRadius: 7,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

        padding: 50,
        marginVertical: 7,
        marginHorizontal: 10,

        backgroundColor: "#ccc",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Rastreamento;