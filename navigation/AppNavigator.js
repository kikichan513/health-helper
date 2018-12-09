import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoading';
import SignInScreen from '../screens/SignIn';

const AuthStack = createStackNavigator({
  Login:SignInScreen,
});

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  App: MainTabNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);