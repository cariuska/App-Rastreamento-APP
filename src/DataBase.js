
import Axios from './Axios';
import Realm from 'realm';

let realm;


/*
Push Notification
https://medium.com/rocketseat/push-notification-no-ios-e-android-com-react-native-66e956c89f5f
*/

/*
Banco de dados Local
https://aboutreact.com/example-of-realm-database-in-react-native/#React-Native-Realm-Database
*/

export function CreateSchema(){

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
}

export function VerificaUsuario(){
    
    realm = new Realm({ path: 'UserDatabase.realm' });

    var users = realm.objects('user')

    if (users.length === 0) {

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

            CreateUser(idUser, token, device, tokenDevice);
            
        })
    }
}

export function DeleteUser(){
    realm = new Realm({ path: 'UserDatabase.realm' });
    realm.write(() => {
        realm.delete(
            realm.objects('objectLocation')
        );
        realm.delete(
            realm.objects('object')
        );
        realm.delete(
            realm.objects('user')
            //realm.objects('user').filtered('user_id =' + input_user_id)
        );
    })
}

export function CreateUser(idUser, token, device, tokenDevice){
    
    realm = new Realm({ path: 'UserDatabase.realm' });

    realm.write(() => {
        realm.create('user', {
            idUser: idUser,
            token: token,
            device: device,
            tokenDevice: tokenDevice,
        });
    });

}

export function GetUser(){
    
    realm = new Realm({ path: 'UserDatabase.realm' });

    var users = realm.objects('user');
    var user = users[0];

    return user;

}

export function CreateObject(idObject, idUser, objectCode, description, dateRegister, status){
    
    realm = new Realm({ path: 'UserDatabase.realm' });

    realm.write(() => {
        realm.create('object', {
            idObject: idObject,
            idUser: idUser,
            objectCode: objectCode,
            description: description,
            dateRegister: dateRegister,
            status: status,
        });
    });

}

export function UpdateObject(idObject, idUser, objectCode, description, dateRegister, status){

    realm = new Realm({ path: 'UserDatabase.realm' });

    realm.write(() => {

        var obj = realm
            .objects('object')
            .filtered('idObject = ' + idObject);
            
        if (obj.length > 0) {
            obj[0].idUser = idUser;
            obj[0].objectCode = objectCode;
            obj[0].description = description;
            obj[0].dateRegister = dateRegister;
            obj[0].status = status;          
        }
    });


}


export function GetAllObject(){
    
    realm = new Realm({ path: 'UserDatabase.realm' });
    var objects = realm.objects('object');
    return objects;

}

export function GetObjectId(idObject){
    
    realm = new Realm({ path: 'UserDatabase.realm' });
    var objects = realm.objects('object').filtered('idObject = ' + idObject);
    var object;
    if (objects.length > 0){
        object = objects[0]
    }
    return object;

}

export function DeleteObjectId(idObject){
    realm = new Realm({ path: 'UserDatabase.realm' });
    realm.write(() => {
        realm.delete(
            realm.objects('objectLocation').filtered('idObject = ' + idObject)
        );
        realm.delete(
            realm.objects('object').filtered('idObject = ' + idObject)
        );
    })
}

export function DeleteAllObject(){
    realm = new Realm({ path: 'UserDatabase.realm' });
    realm.write(() => {
        realm.delete(
            realm.objects('objectLocation')
        );
        realm.delete(
            realm.objects('object')
        );
    })
}