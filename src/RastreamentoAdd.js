import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button, View } from 'react-native';


class RastreamentoAdd extends React.Component {

    onPressCancel = () =>{

        this.props.navigation.goBack()
    }

    render(){

        return (
            <>              
                <SafeAreaView style={styles.view1}>
                    <View style={styles.view2}>

                        <Text>Rastreamento Add</Text>

                        <Button 
                            onPress={this.onPressCancel}
                            title="Cancel"
                        />

                    </View>
                </SafeAreaView>
            </>
        )
    }
};    

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center'

    },
    view2: {
        height: "50%",
        width: '97%',
        backgroundColor:"#fff",
        justifyContent:"center",
        borderWidth: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20
    },
});

export default RastreamentoAdd;