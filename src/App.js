/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*
Push Notification
https://medium.com/rocketseat/push-notification-no-ios-e-android-com-react-native-66e956c89f5f
*/

/*
Banco de dados Local
https://aboutreact.com/example-of-realm-database-in-react-native/#React-Native-Realm-Database
*/

/*
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Realm from 'realm';

import Axios from './Axios'

let realm;

class App extends React.Component {


  state = {
    nameList : ""
  }

  componentDidMount(){
    
    realm = new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user',
          properties: {
            idUser: { type: 'int', default: 0 },
            token: 'string',
            device: 'string',
            tokenDevice: 'string'
          },
        },
        {
          name: 'object',
          properties: {
            idObject: { type: 'int', default: 0 },
            idUser: { type: 'int', default: 0 },
            objectCode: 'string',
            description: 'string',
            dateRegister: 'string',
            status: 'string',
          }
        },
        {
          name: 'objectLocation',
          properties: {
            idObjectLocation: { type: 'int', default: 0 },
            idObject: { type: 'int', default: 0 },              
            data: 'string',
            local: 'string',
            status: 'string',
            source: 'string',
            sourceAddress: 'string',
            sourceLat: 'string',
            sourceLng: 'string',
            destiny: 'string',
            destinyAddress: 'string',
            destinyLat: 'string',
            destinyLng: 'string'
          }
        }
      ],
    });
    

    
    
    //realm.write(() => {
    //  realm.delete(
    //    realm.objects('user')
    //    //realm.objects('user').filtered('user_id =' + input_user_id)
    //  );
    //})
    

    var users = realm.objects('user')

    if (users.length > 0) {

      this.teste()

    }else{    

      const json = JSON.stringify({
          "device": "I",
          "tokenDevice": "456789321695643216549783321698"
      });

      Axios.post(`user`, json )
      .then(res => {
        const idUser = res.data.idUser;
        const token = res.data.token;
        const device = res.data.device;
        const tokenDevice = res.data.tokenDevice;

        realm.write(() => {
          realm.create('user', {
            idUser: idUser,
            token: token,
            device: device,
            tokenDevice: tokenDevice,
          });
        });
        

        this.teste()

      })
    }

  }

  teste = () =>{

    //var users = realm.objects('user').filtered('idUser =' + 2);
    var users = realm.objects('user');
    var user = users[0]

    
    //axios.get(`https://api.apprastreamento.com.br/v1/user`, { 'headers': { 'hash': 'AppRastreamento', 'token': '5a34d65as1das65d41a65da' } })
    //axios.get(`https://api.apprastreamento.com.br/v1/user`, { 'headers': { 'hash': 'AppRastreamento', 'token': user['token'] } })
    Axios.get(`user`, { 'headers': { 'token': user['token'] } })
      .then(res => {
        const nameList = res.data.token;
        this.setState({ nameList });
      })
      .catch(er =>{
        console.warn(er.message)
      })
  }

  render(){

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text>Teste: {this.state.nameList}</Text>
        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
*/

import * as React from 'react';
import { Button, Text, View, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Rastreamento from './Rastreamento';
import RastreamentoAdd from './RastreamentoAdd';
import RastreamentoDet from './RastreamentoDet';
import Frete from './Frete';
import FreteCalc from './FreteCalc';
import Settings from './Settings';
import { Icon } from 'react-native-elements';

import { CreateSchema, VerificaUsuario, GetUser, DeleteUser } from './DataBase';
import { sleep } from './Utils';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RastreamentoStack(props) {

  return (
    
    <Stack.Navigator initialRouteName="Rastreamento"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',        
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
      }}
    >
      <Stack.Screen name="Rastreamento" component={Rastreamento} 
        options={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Icon 
                onPress={() => props.navigation.navigate('RastreamentoAdd')}
                type='font-awesome'
                name="plus"
                color="#FFF"
              />
            </View>
          ),
        }}
      
      />
      <Stack.Screen name="RastreamentoAdd" component={RastreamentoAdd} 
        options={{
          mode: 'modal',
          headerMode: 'none',
          cardStyle:{
            backgroundColor:"transparent",
            opacity:0.99
        }
        }}/>
        <Stack.Screen name="RastreamentoDet" component={RastreamentoDet} />
    </Stack.Navigator>
  );
}


function FreteStack(props) {

  return (
    
    <Stack.Navigator initialRouteName="Frete"
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',        
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
      }}
    >
      <Stack.Screen name="Frete" component={Frete} />
        <Stack.Screen name="FreteCalc" component={FreteCalc}  options={{
            title: "Frete Calculado"
          }} />
    </Stack.Navigator>
  );
}


export default class App extends React.Component {

  

  async componentDidMount(){
    CreateSchema();

    //DeleteUser();
    VerificaUsuario();

    await sleep(3000);

    //var user = GetUser();
    //console.warn(user["token"]);


  }


  render(){
  

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              /*
              if (route.name === 'Rastreamento') {
                iconName = focused
                  ? 'plus'
                  : 'plus';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'cog' : 'cogs';
              }*/
              if (route.name === 'Rastreamento') {
                iconName = 'archive'
              } else if (route.name === 'Frete') {
                iconName = 'truck'
              }else if (route.name === 'Settings') {
                iconName = 'cog'
              }

              // You can return any component that you like here!
              return <Icon name={iconName} type='font-awesome' size={size} color={color} />;
            },
          })}
        
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Rastreamento" component={RastreamentoStack} />
          <Tab.Screen name="Frete" component={FreteStack} />
          <Tab.Screen name="Settings" component={Settings} options={{
            title: "Configurações"
          }} />
        </Tab.Navigator>
        
      </NavigationContainer>
    );
  }
}