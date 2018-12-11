import React from 'react';
import { AsyncStorage, View, Button, Text, Dimensions, Alert, ScrollView } from 'react-native';

export default class JokeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Joke',
  };

  constructor(){
    super();
    this.state = {
      bodyText: " Take the next medication first!",
      backgroundColor: '#FAB913'
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('taskComplete');
      console.log(value)
      if (value == '1') {
        console.log("async joke: " + value);
        this.newJoke();
        await AsyncStorage.setItem('taskComplete', 'false');
        
      } else {
        Alert.alert('No new jokes!', 'You have to complete another task first.');
      }
     } catch (error) {
       console.log("async joke error")
     }
  }

  newJoke() {
    fetch('https://icanhazdadjoke.com/', {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
      },
    })
    .then((response) => {
      return response.text();
    })
    .then((responseText) => {
      this.setState({
        bodyText: responseText,
      }, () => console.log("After setState: ", this.state.bodyText))
    })
    .catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <View>
        <View style={{ paddingTop: 50, backgroundColor: 'black', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: 'white', paddingBottom: 10 }}>
               Joke of the Day
          </Text>
        </View>
        <Text style={{paddingTop: 85, paddingLeft: 10, paddingRight: 10, paddingBottom:85, height: 480, alignItems: 'center',textAlign: 'center',fontWeight: 'bold',fontSize: 25,color: 'black', textAlignVertical: "center"}}>
          {this.state.bodyText}
        </Text>
        <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}> 
          <Button
            title="Generate New Joke"
            color="#FAB913"
            onPress={() => {this._retrieveData()}}
          />
        </ScrollView>
      </View>
    );
  }
}
