import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

export default class JokeScreen extends React.Component {
  static navigationOptions = {
    title: 'Joke',
  };
  constructor(){
    super();
    this.state = {
      bodyText: "An apple a day keeps the doctor away... if you aim well!",
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
        <Text numberOfLines={5}>
          {this.state.bodyText}
        </Text>
        <Button
          title="New Joke"
          color="#841584"
          onPress={() => {this.newJoke()}}
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
