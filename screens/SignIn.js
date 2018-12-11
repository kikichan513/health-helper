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
import t from 'tcomb-form-native';
import { Font } from 'expo';

const Form = t.form.Form


const User = t.struct({
  username: t.String,
})

const options = {
  fields: {
    username: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    }
  }

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'SignIn',
  };

  constructor(props) {
    super(props)
    this.state = {
      value: {
        username: '',
      }
    }
  }


  componentWillUnmount() {

    this.setState = {
      value: {
        username: '',
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }

  _handleAdd = () => {
    const value = this.refs.form.getValue();
    // If the form is valid...
    if (value) {
      const data = {
        username: value.username,
      }
      this._checkExistingUser(data.username)
      Alert.alert('Logged in!', 'Scan the QR code for your pill.')
      this.props.navigation.navigate('App');
    } else {
      // Form validation error
      Alert.alert('Error', 'Please enter your name.')
    }
  }
  
  _checkExistingUser = async (user) => {
    try {
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
      const value = await AsyncStorage.getItem(user);
      if (value == null) {
        try {
          AsyncStorage.setItem(user, "10");
          AsyncStorage.setItem('numTasks', "10")
        } catch (error) {

        }
      } else {console.log("SignIn.js Old user found: " + value);}
      try {
        await AsyncStorage.setItem('currentUser', user);
      } catch (error) {

      }
    } catch (error) {

    }
  }

  render() {
    return (
      <View>
        {/* Header */}
  
        <View style={{ paddingTop: 30, backgroundColor: 'black', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', textAlignVertical: 'center'}}>
              Welcome to
            </Text>
            <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', textAlignVertical: 'center', paddingBottom: 20}}>
              Health Helper! 
            </Text>
        </View>
        <Image style= {{marginTop: 30, marginLeft: Dimensions.get('window').width/2.8, width: 120, height: 120}} source={require('../assets/images/pill.png')}  />
        <ScrollView style={{ marginTop: Dimensions.get('window').height / 13, paddingLeft: 30, paddingRight: 30}}>

          <Form
            ref='form'
            options={options}
            type={User}
            value={this.state.value}
            onChange={this._onChange}
          />
          <Button
            style={{ marginTop: 30}}
            title="Log In"
            color="#FAB913"
            onPress={() => {this._handleAdd()}}
          />
        </ScrollView>
      </View>
    )
  }
}

module.exports = SignInScreen