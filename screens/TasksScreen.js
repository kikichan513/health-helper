/*This is an example of CountDown Timer*/
import React, { Component } from 'react';
//import React in our project
import { View, Alert, Text, AsyncStorage, TouchableHighlight } from 'react-native';
//import all the component we need in our project
import CountDown from 'react-native-countdown-component';
//import CountDown to show the timer
import moment from 'moment';
import { _storeDB } from '../db/database';
//import moment to help you play with date and time
var DB = require('../db/database');

var completed = 0;
var total = 20;
var username = "HappyVampire";

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

  _storeData = async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      value = parseInt(await AsyncStorage.getItem(user));
      console.log("initial value: " + value);
      value = String(value + 1);
      console.log("final value: " + value);
      DB._storeDB(user, value);
      DB._addnewTask();
    } catch (error) {}
  }

  _barcodeRead = async () => {
    let read = '';
    try {
      read = await AsyncStorage.getItem('barcodeRead') || '0';
      await AsyncStorage.setItem('barcodeRead', '0');
    } catch (error) {}
    return read;
  }

    _simpleAlert = (title, task) => {
        console.log("alert task", task)
        Alert.alert(title, task,
          [{ text: 'OK', onPress: () => { } }],
          {cancelable:false}
        )
    }
    _alert = (title, task) => {
        var barcodeRead;
        console.log("main alert task", task)
        this._barcodeRead().then(x => barcodeRead = x);
        Alert.alert(title, task,
            [{ text: 'OK', onPress: () => {
                if (this.state.cColor == 'grey') {
                  this._simpleAlert('You already completed this task!');
                } else if (barcodeRead === '1') {
                  this.props.navigation.navigate('LeaderBoard');
                  this._storeData();
                  this.setState({
                    cColor: 'grey'
                  });
                } else {
                  this._simpleAlert('No QR code was scanned!')
                } } },
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
    var expirydate = '2018-12-02 05:00:00';//You can set your own date-time
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
          <Text style={{ fontSize: 20, color: 'grey', paddingTop: 20, paddingLeft: 10, paddingRight:10 }}>
              Press on the time under the medication that you have just taken!
          </Text>
        </View>
        <View style={{ paddingTop: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: 'black', paddingTop: 20}}>
              Daily Pill
          </Text>
        </View>
        {/* <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 15, color: 'grey', paddingTop: 10}}>
                  days          hours          mins           secs
          </Text>
        </View> */}

      <View style={{ justifyContent: 'center', paddingTop: 15, paddingBottom: 30}}>
        <CountDown id= 'Task One'
          digitBgColor={this.state.cColor}
          until={parseInt(this.state.totalDuration)}
          //duration of countdown in seconds
          timetoShow={('H', 'M', 'S')}
          //format to show
          onFinish={() => alert("Time's up!")}
          //on Finish call
          onPress={() => this._alert('Submit?', 'Daily Pill')}
          //on Press call
          size={30}
        />
        </View>
      </View>
    );
  }
}