import React from 'react';
import { AsyncStorage, View, Button, Text, StyleSheet, Dimensions } from 'react-native';

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
      value = await AsyncStorage.getItem('Task One');
      console.log(value)
      if (value == "1") {
        console.log("async joke: " + value);
        this.newJoke();
        AsyncStorage.setItem('Task One', "0");
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
        <Text style={{paddingTop: 150, paddingLeft: 10, paddingRight: 10, paddingBottom:20, fontWeight: 'bold', width: Dimensions.get('window').width, height: 480, backgroundColor: '#FAB913', alignItems: 'center',textAlign: 'center',fontWeight: 'bold',fontSize: 25,textAlignVertical: "center"}}>
          {this.state.bodyText}
        </Text> 
        <Button
          title="New Joke"
          style={{backgroundColor: 'red', }}
          onPress={() => {this._retrieveData()}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
