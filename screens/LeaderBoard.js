import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';

import Leaderboard from 'react-native-leaderboard';
var DB = require('../db/database');

export default class LeaderBoard extends Component {
    static navigationOptions = {
        header: null,
        title: 'LeaderBoard',
    };
    
    state = {
        data: [
            { name: 'Black chair coffee', score: 78, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
            { name: 'Lattee cafe', score: 88, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
            { name: 'Beanie soft turtle', score: 98, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
            { name: 'Jack and Jill', score: 92, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
            { name: 'Beanstalk Cinderella', score: 80, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
            { name: 'Scarf purple tuplip', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
            { name: 'YOU!', score: 0, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
            { name: 'Scruffy road witches', score: 100, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
            { name: 'Clock happy feet', score: 100, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-afro-guy.png' },
        ]
    }

    _alert = (title, body) => {
        Alert.alert(title, body,
            [{ text: 'OK', onPress: () => { } },],
            { cancelable: false }
        )
    }

    _retrieveData = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        const value = parseInt(DB._retrieveDB(user));
        this.setState({data: [
          { name: 'Black chair coffee', score: 78, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
          { name: 'Lattee cafe', score: 88, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
          { name: 'Beanie soft turtle', score: 98, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
          { name: 'Jack and Jill', score: 92, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
          { name: 'Beanstalk Cinderella', score: 80, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
          { name: 'Scarf purple tuplip', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
          { name: user, score: value, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
          { name: 'Scruffy road witches', score: 100, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
          { name: 'Clock happy feet', score: 100, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-afro-guy.png' },
        ]});
      } catch (error) {}
    }

    render() {
      this._retrieveData();
      console.log("printing" + DB.numTasks);
        const props = {
            labelBy: 'name',
            sortBy: 'score',
            data: this.state.data,
            icon: 'iconUrl',
            onRowPress: () => {
                this.props.navigation.navigate('Joke')
            },
            evenRowColor: '#edfcf9',
        }
        return (
            <View>
                {/* Ghetto Header */}
                <View style={{ paddingTop: 50, backgroundColor: 'black', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white', paddingBottom: 10 }}>
                        Leaderboard
                    </Text>
                </View>
                <Leaderboard {...props} />
            </View>
        )
    }
}