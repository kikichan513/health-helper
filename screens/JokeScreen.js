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
      bodyText: " Submit the next medication before you can get another joke!",
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
        <View style={{ paddingTop: 30, backgroundColor: 'black', alignItems: 'center' , paddingBottom: 20}}>
          <Text style={{ fontSize: 30, color: 'white', paddingBottom: 10 }}>
               Joke of the Day
          </Text>
        </View>

       <View style={{ margin: 20, alignItems: 'center' , borderWidth: 1, borderRadius: 5, backgroundColor:'#fab913', padding: 70, borderColor: 'white'}}>

        <Text style={{padding: 5, alignItems: 'center',textAlign: 'center',fontSize: 25,color: 'black', textAlignVertical: "center"}}>
          {this.state.bodyText} </Text>
          </View>
        <ScrollView style={{ marginTop: 70, paddingLeft: 10, paddingRight: 10 }}> 
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
