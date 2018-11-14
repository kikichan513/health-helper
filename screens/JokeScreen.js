import React from 'react';
import { AsyncStorage, View, Button, Text, StyleSheet } from 'react-native';

export default class JokeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Joke',
  };

  constructor(){
    super();
    this.state = {
      bodyText: "No joke for now!",
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
              Your Joke of the Day
          </Text>
        </View>
        <Text style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, fontSize: 15}}>
          {this.state.bodyText}
        </Text>
        <Button
          title="New Joke"
          color="#841584"
          onPress={() => {this._retrieveData()}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
