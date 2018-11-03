import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';

import Leaderboard from 'react-native-leaderboard';

export default class TasksScreen extends Component {
    static navigationOptions = {
        header: null,
        title: 'Tasks',
    };
    state = {
        data: [
            { title: 'Task 1', time: '2hrs' , isSubmitted: false },
            { title: 'Task 2', time: '10hrs', isSubmitted: false },
            { title: 'Task 3', time: '24hrs', isSubmitted: false },
        ]
    }

    _alert = (title, body) => {
        Alert.alert(title, body,
            [{ text: 'OK', onPress: () => { this.state.data.isSubmitted = true, this.props.navigation.navigate('LeaderBoard')} }, { text: 'Cancel', onPress: () => { } }],
            { cancelable: false }
        )
    }

    render() {
        const props = {
            labelBy: 'title',
            sortBy: 'time',
            data: this.state.data,
            onRowPress: (item, index) => {
                this._alert("Submit?")
            },
            evenRowColor: '#edfcf9',
        }

        return (
            <View>
                {/* Ghetto Header */}
                <View style={{ paddingTop: 50, backgroundColor: 'black', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'white', paddingBottom: 10 }}>
                        Tasks
                    </Text>
                </View>
                <Leaderboard {...props} />
            </View>
        )
    }
}