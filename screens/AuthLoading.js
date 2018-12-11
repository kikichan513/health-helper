import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Alert,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      const userToken = await AsyncStorage.getItem('currentUser');
      await AsyncStorage.setItem('barcodeRead', '0');
      await AsyncStorage.setItem('taskComplete', '0');
      const numTasks = await AsyncStorage.getItem('numTasks');
      if (numTasks == null) {
        await AsyncStorage.setItem('numTasks', '10');
      }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (userToken != null && userToken != ' ') {
        Alert.alert('Logged in!', 'Welcome back, ' + userToken + '.');
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    } catch (error) {}
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}