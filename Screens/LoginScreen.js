import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


class LoginScreen extends React.Component {
//create props and state     
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            token:""
        };
        this.userLogin= this.userLogin.bind(this);
    }

    setUsername = (username) => {
        this.setState({username: username});
    }

    setPassword = (password) => {
        this.setState({password: password});
    }

userLogin = () =>{
    //basic auth with fetch 
    console.log(this.state.username, this.state.password);
    let base64 = require('base-64');
    let url = 'http://cs571.cs.wisc.edu:5000/users/login';
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));
    
    fetch(url, {method:'GET',
            headers: headers,
        })
        .then((response) => response.json())
        .then((response)=>{
            if(response.token){
                this.props.login(this.state.username, response.token);
            } else {
                alert(response.message);
            }
        })
    }

    render(){
        return (
            <View 
                style={styles.container}
            >
                <View 
                    style={styles.formWrapper}
                >
                    <Text 
                        style={styles.welcomeText}
                        >Welcome to Fitness Tracker!</Text>

                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.loginCredentials}
                        >Enter username:</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setUsername(text))}
                            // onChangeText={(text) => { this.setState({ username: text})}}
                        />
                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.loginCredentials}
                        >Enter password:</Text>

                        <TextInput 
                            style={styles.textInput} 
                            onChangeText={(text) => (this.setPassword(text))}
                            secureTextEntry={true}
                        />
                    </View> 
                <Button
                    style={styles.loginLooks}
                    title= "Login"
                    onPress= {this.userLogin}
                />
                <Button
                    // style={styles.signupLooks}
                    title= "Need an account? Sign up here!"
                    onPress={() => this.props.navigation.navigate('Signup')}
                />
            </View>
        </View>
    </View>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    formWrapper: {
        width: "90%"
    },
    formRow: {
        marginBottom:10
    },
    textInput: {
        backgroundColor: "#ddd",
        height: 40,
        paddingHorizontal:10,
        marginBottom: 20,
        color: "#000000"
    },
    welcomeText: {
        textAlign:"center",
        marginBottom: 25,
        fontSize: 40
    },
    loginCredentials: {
        textAlign:"left",
        fontSize:20,
        color: "#000000"
    },
    loginLooks: {
        textAlign:"center",
        fontSize:20,
        backgroundColor:"#006400",
        marginVertical: 20
    },
    signupLooks: {
        textAlign:"center",
        fontWeight: "bold",
        fontSize: 20
    },
})

export default LoginScreen;