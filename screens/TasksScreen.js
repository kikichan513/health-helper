/*This is an example of CountDown Timer*/
import React, { Component } from 'react';
//import React in our project
import { View, Alert, Text, AsyncStorage, TouchableHighlight } from 'react-native';
//import all the component we need in our project
import CountDown from 'react-native-countdown-component';
//import CountDown to show the timer
import moment from 'moment';
//import moment to help you play with date and time


export default class App extends Component {

    static navigationOptions = {
        header: null,
        title: 'Tasks',
    };
  constructor(props) {
    super(props);
    //initialize the counter duration
    this.state = {
      totalDuration: '',
      cColor: '#FAB913',
    };
  }

  _storeData = async (task) => {
    try {
        await AsyncStorage.setItem(task, "1");
        console.log("async printing" + task);
      } catch (error) {console.log("error");}
    }

    _simpleAlert = (title, task) => {
        console.log("alert task", task)
        Alert.alert(title, task,
          [{ text: 'OK', onPress: () => { } }],
          {cancelable:false}
        )
    }
    _alert = (title, task) => {
        console.log("alert task", task)
        Alert.alert(title, task,
            [{ text: 'OK', onPress: () => {
                if (this.state.cColor == 'grey') {
                  this._simpleAlert('You already completed this task!')
                }
                else {
                this.props.navigation.navigate('LeaderBoard'),
                this._storeData(task),
                this.setState({
                  cColor: 'grey'
                }),
                console.log(task) } } },
                { text: 'Cancel', onPress: () => { } }],
            { cancelable: false }
        )
    }

  componentDidMount() {
   var that = this;
    //We are showing the coundown timer for a given expiry date-time
    //If you are making a quize type app then you need to make a simple timer
    //which can be done by using the simple like given below
    //that.setState({ totalDuration: 30 }); //which is 30 sec
    var date = moment()
      .utcOffset('-05:00')
      .format('YYYY-MM-DD hh:mm:ss');
    //Getting the current date-time with required formate and UTC   
    var expirydate = '2018-12-02 17:00:00';//You can set your own date-time
    //Let suppose we have to show the countdown for above date-time 
    var diffr = moment.duration(moment(date).diff(moment(expirydate)));
    //difference of the expiry date-time given and current date-time
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    //converting in seconds
    d = (24 * 60 * 60) - (d % (24 * 60 * 60))
    that.setState({ totalDuration: d });
    //Settign up the duration of countdown in seconds to re-render
  }
  render() {
    console.log(this.state.totalDuration);
    return (
      <View>
        <View style={{ paddingTop: 50, backgroundColor: 'black', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, color: 'white', paddingBottom: 10 }}>
              Tasks
          </Text>
        </View>
        <View style={{ paddingTop: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'grey', paddingTop: 20}}>
              Press on the time under the medication that you have just taken!
          </Text>
        </View>
        <View style={{ paddingTop: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'black', paddingTop: 20}}>
              Daily Pill
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 15, color: 'grey', paddingTop: 10}}>
                  days          hours          mins           secs
          </Text>
        </View>

      <View style={{ flex: 1, justifyContent: 'center', paddingTop: 45, paddingBottom: 30}}>
        <CountDown id= 'Task One'
          digitBgColor={this.state.cColor}
          until={this.state.totalDuration}
          //duration of countdown in seconds
          timetoShow={('H', 'M', 'S')}
          //format to show
          onFinish={() => alert("Time's up!")}
          //on Finish call
          onPress={() => this._alert('Submit?', 'Task One')}
          //on Press call
          size={30}
        />
        </View>
      </View>
    );
  }
}