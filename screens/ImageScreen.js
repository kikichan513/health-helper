import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class ImageScreen extends Component {
    static navigationOptions = {
        title: 'Images',
    };

    constructor(props) {
        super(props)
        this.state = {
          people: this.props.navigation.state.params.people,
        };
    }

    render() {
        console.log(this.state.people);
        return (
            <View style={styles.container}>
                <Text>Image Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
     marginTop: 300,
     marginLeft: 70,
     
  }
})