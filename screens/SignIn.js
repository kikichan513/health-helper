import React from 'react';
import {
  Alert,
  AsyncStorage,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form

const User = t.struct({
  name: t.String,
})

const options = {
  fields: {
    name: {
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
        name: '',
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        name: '',
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
        username: value.name,
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
      console.log("SignIn.js Initial user set: " + user);
      if (value == null) {
        try {
          console.log("SignIn.js New user found: " + user);
          AsyncStorage.setItem(user, "10");
          console.log("SignIn.js User set: 10");
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
        {/* Ghetto Header */}
        <View style={{ paddingTop: 30, backgroundColor: 'black', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', textAlignVertical: 'center'}}>
                Welcome to HealthAdherence!
            </Text>
        </View>
        <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Form
            ref='form'
            options={options}
            type={User}
            value={this.state.value}
            onChange={this._onChange}
          />
          <Button
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