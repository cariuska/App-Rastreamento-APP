import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';
import Header from './Header';


class Settings extends React.Component {

    

    render(){

        return (
            <>
                <Header title="Configurações" />
                <ScrollView>
                    <SafeAreaView style={styles.view}>
                        <Text>Settings</Text>
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

export default Settings; 