import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

class SignupScreen extends React.Component {
//create props and state     
constructor(props) {
    super(props);
    this.state = {
        username:"",
        password:"", 
        token:""
    };
    this.saveUserProfile= this.saveUserProfile.bind(this);
}


setUsername = (username) => {
    this.setState({username: username});
}

setPassword = (password) => {
    this.setState({password: password});
}

saveUserProfile = () => {
    fetch('http://cs571.cs.wisc.edu:5000/users',{
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        }),
    })
        .then(response => response.json())
        .then(response =>{
            alert(response.message);      
        })
        .catch((error) => {
            alert(error);
        });
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
                        style={styles.registrationText}
                        >User Registration</Text>

                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.loginCredentials}
                        >Create a username:</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setUsername(text))}
                        />
                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.loginCredentials}
                        >Create a password:</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setPassword(text))}
                            secureTextEntry={true}
                        />
                </View>
                <Button
                    style={styles.signupLooks}
                    title= "Create Account"
                    onPress= {this.saveUserProfile}
                />
                <Button
                    style={styles.exitBttn}
                    title= "Exit"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        </View>
    </View>    
        )
    }

}

export default SignupScreen;

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
    registrationText: {
        textAlign:"center",
        marginBottom: 25,
        fontSize: 40
    },
    loginCredentials: {
        textAlign:"left",
        fontSize:20,
        color: "#000000"
    },
    createAcctLooks: {
        textAlign:"center",
        fontSize:20,
        backgroundColor:"#006400",
        marginVertical: 20,
        fontWeight: "bold"
    },
    signupLooks: {
        textAlign:"center",
        fontWeight: "bold",
        fontSize: 20
    },
    exitBttn: {
        textAlign:"center",
        fontSize:20,
        backgroundColor:"red",
        marginVertical: 10,
        fontWeight: "bold"
    }
})

