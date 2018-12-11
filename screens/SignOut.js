import React from 'react';
import {
  Alert,
  AsyncStorage,
  ScrollView,
  View,
  Text,
  Button,
  Dimensions,
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
            // get at each store's key/value so you can work with it
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
        <View style={{ paddingTop: 30, backgroundColor: 'black', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', textAlignVertical: 'center' }}>
              Goodbye from HealthAdherence!
          </Text>
        </View>
        <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Text style={{paddingLeft: 10, paddingRight: 10, paddingTop:10, paddingBottom:10, alignItems: 'center', textAlign: 'center', fontSize: 14 ,color: 'black', textAlignVertical: 'center'}}>
            Just log in again with your name to retrieve your data.
          </Text> 
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