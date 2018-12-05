import React, { Component } from 'react';

import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity, Image, Header } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { createStackNavigator, SafeAreaView } from 'react-navigation';


export default class App extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null
  };

  componentDidMount() {
    this._requestCameraPermission();

  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      {/* logic to go to next screen => can move this to the tab screen*/}
      console.log("lastScannedUrl" + result.data)
      if (result.data == "adherence"){
        console.log("lets navigate")
        this.props.navigation.navigate('Tasks')
      }
    }
  };

  render() {
    const { navigate } = this.props.navigation


    return (   
        <View style={styles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: 'black' }}>
                  Camera permission is not granted
                </Text>
              : 

              <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                  height: Dimensions.get('window').height ,
                  width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    
  };
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    justifyContent: 'center',
    left:0,
    right:0,
    top:-10,
    bottom:0
  },
 
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});