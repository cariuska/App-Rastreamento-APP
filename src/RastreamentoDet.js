import React from 'react';
import { SafeAreaView, Text,  StyleSheet, ScrollView, View } from 'react-native';
import { GetObjectId } from './DataBase';
import Header from './Header';


class RastreamentoDet extends React.Component {

    state={
        idObject: 0,
        idUser: 0,
        objectCode: '',
        description: '',
        dateRegister: '',
        status: '',        
    }

    componentDidMount(){

        const idObject = this.props.route.params.idObject;

        this.carregaObjects(idObject);

    }

    
    carregaObjects = (idObject) => {

        const object = GetObjectId(idObject);
        const description = object.description;
        const objectCode = object.objectCode;
        

        //this.props.navigation.setOptions({ title: description })

        

        this.setState({ idObject, description, objectCode })

    }


    

    render(){

        const { idObject, description, objectCode } = this.state;

        return (
            <>
                <Header title={description} subTitle={objectCode} left navigation={this.props.navigation} />
                <ScrollView>
                    <SafeAreaView style={styles.view}>
                        <Text>Rastreamento Detalhe {idObject}</Text>
                    </SafeAreaView>
                </ScrollView>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    }
});

export default RastreamentoDet;