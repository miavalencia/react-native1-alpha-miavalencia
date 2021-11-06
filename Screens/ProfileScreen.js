import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button} from 'react-native';



class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            firstName:"",
            lastName:"",
            calories:0,
            protein:0,
            carbs:0,
            fat:0,
            activity:""
        };
    }

    setUsername = (username) => {
        this.setState({username: username});
    }

    setPassword = (password) => {
        this.setState({password: password});
    }
    setFirstname = (firstName) => {
        this.setState({firstName: firstName});
    }
    setLastname = (lastName) => {
        this.setState({lastName: lastName});
    }
    setCalories = (calories) =>{
        this.setState({calories: calories});
    }
    setProtein = (protein) =>{
        this.setState({protein:protein});
    }
    setCarbs = (carbs) =>{
        this.setState({carbs:carbs});
    }
    setFat = (fat) =>{
        this.setState({fat:fat});
    }
    setActivity = (activity) => {
        this.setState({activity: activity});
    }
        
    saveUserProfilse = () => {
        fetch('http://cs571.cs.wisc.edu:5000/users/' + this.props.username, {
            method: 'PUT',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username: this.state.username,
                password:this.state.password,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                calories:this.state.calories,
                protein:this.state.protein,
                carbs:this.state.carbs,
                activity:this.state.activity,
            })
        })
        .then(response => response.json())
        .then(response =>{
            if(response.token){
                 this.props.login(this.state.username, response.token);
                 alert("Profile saved successfully! Press Exit to go to login") 
            } else {
                alert("Incorrect username or password! Please try again.") 
            }})
    }
    
    componentDidMount(){
        fetch('http://cs571.cs.wisc.edu:5000/users/' + this.props.route.params.username, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.props.route.params.accessToken
            },
        })
        .then(response => response.json())
        .then(response => {
            this.setState({firstName})
        })
    }

    render() {
        return (
            <ScrollView>
            <View 
                style={styles.container}
            >
                <View 
                    style={styles.formWrapper}
                >
                    <Text 
                        style={styles.newProfileText}
                        >Personal Information</Text>

                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.profileInfo}
                        >First Name:</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setFirstname(text))}
                        />
                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.profileInfo}
                        >Last Name:</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setLastname(text))}
                            secureTextEntry={true}
                        />
                    </View>
                    <Text 
                        style={styles.newProfileText}
                        >Fitness Goals</Text>
                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.profileInfo}
                        >Daily Calories (kcal):</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setCalories(text))}
                            secureTextEntry={true}
                        />
                    </View>
                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.profileInfo}
                        >Daily Protein (grams):</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setProtein(text))}
                            secureTextEntry={true}
                        />
                    </View>
                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.profileInfo}
                        >Daily Carbs (grams):</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setCarbs(text))}
                            secureTextEntry={true}
                        />
                    </View>
                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.profileInfo}
                        >Daily Fat (grams):</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setFat(text))}
                            secureTextEntry={true}
                        />
                    </View>
                    <View
                        style={styles.formRow}
                    >
                        <Text 
                        style={styles.profileInfo}
                        >Daily Activity (min):</Text>

                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => (this.setActivity(text))}
                            secureTextEntry={true}
                        />
                    </View>
                    <Text 
                        style={styles.endText}
                        >Looks good! All set?</Text>
                 <Button
                    style={styles.saveBttn}
                    title= "Save Profile"
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
    </ScrollView>
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
        marginBottom: 10,
        color: "#000000"
    },
    newProfileText: {
        textAlign:"center",
        marginBottom: 10,
        fontSize: 35
    },
    profileInfo: {
        textAlign:"left",
        fontSize:20,
        color: "#000000"
    },
    endText: {
        textAlign:"center",
        fontSize:30,
        marginVertical: 30,
        fontWeight: "bold"
    },
    saveBttn: {
        textAlign:"center",
        fontSize:20,
        backgroundColor:"#006400",
        marginVertical: 10,
        fontWeight: "bold"
    },
    exitBttn: {
        textAlign:"center",
        fontSize:20,
        backgroundColor:"red",
        marginVertical: 10,
        fontWeight: "bold"
    },
})

export default ProfileScreen;