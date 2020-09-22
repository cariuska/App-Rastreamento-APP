import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import Header from './Header';


class Frete extends React.Component {


    onPressDet = () => {
        this.props.navigation.navigate('FreteCalc', { parametros: 123 } )
    }


    render(){

        return (
            <>
                <Header title={"Frete"} />
                <SafeAreaView style={styles.view}>
                    <Text>Frete</Text>
                    <Button 
                        onPress={this.onPressDet} 
                        title="Calcular Frete"
                    />
                </SafeAreaView>
            </>
        )
    }
};    

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Frete;