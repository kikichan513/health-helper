import React, { Component } from 'react';
import { View, Alert, Text, AsyncStorage } from 'react-native';

import Leaderboard from 'react-native-leaderboard';
var DB = require('../db/database');

export default class LeaderBoard extends Component {
    static navigationOptions = {
        header: null,
        title: 'LeaderBoard',
    };

    state = {
        data: []
    }

    componentWillUnmount() {
        this.isUnmount = true;
    }

    _alert = (title, body) => {
        Alert.alert(title, body,
            [{ text: 'OK', onPress: () => { } },],
            { cancelable: false }
        )
    }

    _retrieveData = async () => {
      var total;
      DB._getnumTask().then(x => total = x);
      try {
        const user = await AsyncStorage.getItem('currentUser');
        const value = await AsyncStorage.getItem(user);
        console.log('value: ' + value);
        value = parseInt (value / parseFloat(total) * 100);
        console.log('total: ' + total);
            !this.isUnmount && this.setState({data: [
                { name: 'FunnyWitch', score: 100, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
                { name: 'HappyVampire', score: 90, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
                { name: 'CuriousMermaid', score: 50, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
                { name: 'SadWerewolf', score: 40, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
                { name: 'AngryFairy', score: 60, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
                { name: user, score: value, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
            ]});
      } catch (error) {}
    }

    _getCurrentUser = async () => {
        let user = '';
        try {
          user = await AsyncStorage.getItem('currentUser');
        } catch (error) {}
        return user;
    }

    render (){
      var userName;
      !this.isUnmount && this._retrieveData();
      !this.isUnmount && this._getCurrentUser().then(x => userName = x);
        const props = {
            labelBy: 'name',
            sortBy: 'score',
            data: this.state.data,
            icon: 'iconUrl',
            onRowPress: (item, index) => {
                if (item.name == userName) {
                    this.props.navigation.navigate('Joke')
                }
            },
            evenRowColor: '#fcdc89',
        }
        return (
            <View>
                <View style={{ paddingTop: 30, backgroundColor: 'black', alignItems: 'center' , paddingBottom: 20}}>
                    <Text style={{ fontSize: 30, color: 'white', paddingBottom: 10 }}>
                        Leaderboard
                    </Text>
                </View>
                <Leaderboard {...props} />

                <View style={{ margin: 10, marginTop: 30, paddingTop: 10, alignItems: 'center' , borderWidth: 1, borderRadius: 5}}>
                  <Text style={{ fontSize: 16, color: 'grey', padding: 25, borderColor: 'grey', }}>
                      Press on your username to see the Joke 
                  </Text>
                </View>
            </View>
        )
    }
}