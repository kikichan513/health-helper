import React from 'react';
import {
  Alert,
  AsyncStorage,
  ScrollView,
  View,
  Text,
  Button,
  Dimensions,
  Image
} from 'react-native';

export default class SignOutScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'SignOut',
  };
  
  _signOutAsync = async () => {
    try {
      await AsyncStorage.setItem('currentUser', ' ');
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            console.log(key + ": " + value);
          });
        });
      });
      this.props.navigation.navigate('Auth');
    } catch (error) {}
  };

  render() {
    return (
      <View>
        <View style={{ paddingTop: 30, backgroundColor: 'black', alignItems: 'center', paddingBottom: 20 }}>
          <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', textAlignVertical: 'center' }}>
              Good Bye from Health Helper!
          </Text>
        </View>
                <Image style= {{marginTop: 30, marginLeft: Dimensions.get('window').width/2.8, width: 120, height: 120}} source={require('../assets/images/pill.png')}  />

        <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ marginTop: Dimensions.get('window').height / 10,alignItems: 'center' , borderWidth: 1, borderRadius: 5}}>

          <Text style={{alignItems: 'center', textAlign: 'center', fontSize: 16 ,color: 'grey', textAlignVertical: 'center', padding: 30}}>
            Just log in again with your name to retrieve your data.
          </Text> </View>
          <Button
            title="Sign Out"
            color="#FAB913"
            onPress={() => {!this.isUnmount && this._signOutAsync()}}
          />
        </ScrollView>
      </View>
    )
  }
}