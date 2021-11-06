import { StatusBar } from 'expo-status-bar';
import React, {Component, Stack} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SignupScreen from './Screens/SignupScreen';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        username:"",
        password:"",
        token:""
    };
    this.login= this.login.bind(this);
  }

  login (usernameInput,passwordInput){
    this.setState({username:usernameInput, password:passwordInput});
  }

  signup (usernameInput,passwordInput){
    this.setState({username:usernameInput, password:passwordInput});
  }

 render(){
  const Stack = createNativeStackNavigator();

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} username={this.username} login={this.login} />}
          </Stack.Screen>
          <Stack.Screen name="Signup"> 
            {props => <SignupScreen {...props} username={this.username} signin={this.signup}/>}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {props => <ProfileScreen {...props} username={this.username} token={this.state.token}/>}
          </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )}
}

export default App;

