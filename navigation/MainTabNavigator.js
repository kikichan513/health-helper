import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LeaderBoardScreen from'../screens/LeaderBoard';
import JokeScreen from '../screens/JokeScreen';
import ImageScreen from '../screens/ImageScreen';

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
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
const ImageStack = createStackNavigator({
  Image: ImageScreen,
});

ImageStack.navigationOptions = {
  tabBarLabel: 'Image',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? `ios-options${focused ? ''
        : '-outline'}` : 'md-link'}
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
        ? `ios-options${focused ? ''
        : '-outline'}` : 'md-link'}
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
      ? `ios-options${focused ? '' : '-outline'}`
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
      ? `ios-options${focused ? '' : '-outline'}`
      : 'md-happy'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  TasksStack,
  ImageStack,
  LeaderboardStack,
  // SettingsStack,
  JokeStack,
});
