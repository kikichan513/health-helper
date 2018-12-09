import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SignOutScreen from '../screens/SignOut.js'
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LeaderBoardScreen from'../screens/LeaderBoard';
import JokeScreen from '../screens/JokeScreen';

const SignOutStack = createStackNavigator({
  SignOut: SignOutScreen,
});

SignOutStack.navigationOptions = {
  tabBarLabel: 'Sign Out',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-exit${focused ? '' : '-outline'}`
          : 'md-exit'
      }
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-qr-scanner${focused ? '' : '-outline'}`
          : 'md-qr-scanner'
      }
    />
  ),
};

const TasksStack = createStackNavigator({
  Tasks: TasksScreen,
});

TasksStack.navigationOptions = {
  tabBarLabel: 'Tasks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? `ios-list-box${focused ? ''
        : '-outline'}` : 'md-list-box'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? `ios-options${focused ? ''
        : '-outline'}` : 'md-options'}
    />
  ),
};

const LeaderboardStack = createStackNavigator({
  LeaderBoard: LeaderBoardScreen,
});

LeaderboardStack.navigationOptions = {
  tabBarLabel: 'Leaderboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
      ? `ios-trophy${focused ? '' : '-outline'}`
      : 'md-trophy'}
    />
  ),
};

const JokeStack = createStackNavigator({
  Joke: JokeScreen,
});

JokeStack.navigationOptions = {
  tabBarLabel: 'Jokes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
      ? `ios-happy${focused ? '' : '-outline'}`
      : 'md-happy'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  TasksStack,
  LeaderboardStack,
  JokeStack,
  SignOutStack,
});
