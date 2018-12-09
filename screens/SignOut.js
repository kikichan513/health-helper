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
      await AsyncStorage.setItem('currentUser', '');
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
            onPress={() => {this._signOutAsync()}}
          />
        </ScrollView>
      </View>
    )
  }
}