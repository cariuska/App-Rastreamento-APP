import React from 'react';
import { Text, StyleSheet } from "react-native";
import { Header, Icon } from 'react-native-elements';

class MyHeader extends React.Component {

    state={
        title: ""
    }

    
    leftComponent = () => {
        
        const { left, navigation } = this.props

        if (left) {
            return (
                    <Icon 
                        onPress={() => navigation.goBack()}
                        type='font-awesome'
                        name="chevron-left"
                        color="#FFF" 
                    />
            );
        }else{
            return null;
        }
    }
    
    rightComponent = () => {
        
        const { right, navigation, detination } = this.props

        if (right) {
            return (
                    <Icon 
                        onPress={() => navigation.navigate(detination)}
                        type='font-awesome'
                        name="plus"
                        color="#FFF" 
                    />
            );
        }else{
            return null;
        }
    }
    

    centerComponent = () => {

        const { title, subTitle } = this.props

        return (
            <>
                <Text style={styles.titulo}>{title}</Text>
                {subTitle ? <Text style={styles.subTitulo}>{subTitle}</Text> : null}
            </>
        );
    }

    render(){



        return(
            
            <Header
                leftComponent={this.leftComponent}
                centerComponent={this.centerComponent} 
                rightComponent={this.rightComponent} 
                containerStyle={styles.header}
            />
        );
    }

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f4511e',
        justifyContent: 'space-around',
    },
    titulo: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    subTitulo: {
        color: '#fff',
        fontSize: 13
    }
});

export default MyHeader;