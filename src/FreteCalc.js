import React from 'react';
import { SafeAreaView, Text,  StyleSheet } from 'react-native';
import Header from './Header';


class FreteCalc extends React.Component {

    componentDidMount(){


    }

    render(){

        return (
            <>
                <Header title={"Frete Calculado"} navigation={this.props.navigation} left />
                <SafeAreaView style={styles.view}>
                    <Text>Frete Calculado {this.props.route.params.parametros}</Text>
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

export default FreteCalc;