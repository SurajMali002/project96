import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import AppHeader from '../components/AppHeader';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends React.Component{

    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            isModalVisible:false,
            value:'',
            first_name:'',
            last_name:'',
            contact:'',
            address:'',
            email_id:'',
            create_password:'',
            confirm_password:''
        }
    }
    
    userLogin=async()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            this.props.navigation.navigate("AppTabNavigator")
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }
    
    userSignUp=async()=>{
        if(
            this.state.first_name==='' || this.state.last_name==='' || this.state.contact==='' || this.state.address==='' || this.state.email_id==='' || this.state.value==='' || this.state.create_password==='' || this.state.confirm_password==='' 
        ){
            return Alert.alert("Input Box are empty")
        }else{
            if(this.state.confirm_password===this.state.create_password){
                firebase.auth().createUserWithEmailAndPassword(this.state.email_id, this.state.confirm_password)
                .then(()=>{
                    db.collection("users").add({
                        first_name:this.state.first_name,
                        last_name:this.state.last_name,
                        contact:this.state.contact,
                        address:this.state.address,
                        email_id:this.state.email_id,
                        value:this.state.value
                    })
                    Alert.alert("User added successfully", " ", [
                        {
                            text:"Ok",
                            onPress : ()=>{this.setState({isModalVisible:false})}
                        }
                    ])
                })
                .catch((error)=> {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                })
            }
        }
    }

    showModal=()=>{
        return(
            <Modal
                animationType="slide"
                visible={this.state.isModalVisible}
                transparent={false}
            >
                <ScrollView>
                <KeyboardAvoidingView style={{flex:1, backgroundColor:"white"}} >
                    <View style={styles.textContainer} >
                        <Text style={styles.textStyle} >Registration</Text>
                    </View>
                    <TextInput
                        placeholder="First Name"
                        onChangeText={(text)=>{this.setState({first_name:text})}}
                        style={styles.modalInputBox}
                    />
                    <TextInput
                        placeholder="Last Name"
                        onChangeText={(text)=>{this.setState({last_name:text})}}
                        style={styles.modalInputBox}
                    />
                    <TextInput
                        placeholder="Contact"
                        onChangeText={(text)=>{this.setState({contact:text})}}
                        style={styles.modalInputBox}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Address"
                        onChangeText={(text)=>{this.setState({address:text})}}
                        style={styles.modalInputBox}
                    />
                    <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:20}}>
                        <TouchableOpacity 
                            style={[styles.modalButtonStyle,{backgroundColor:this.state.value==='doctor'?("#51b3ff"):("white")}]} 
                            onPress={()=>{this.setState({value:'doctor'})}}
                        >
                            <Text style={styles.modalButtonText} >Doctor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={[styles.modalButtonStyle,{backgroundColor:this.state.value==='patient'?("#51b3ff"):("white")}]} 
                        onPress={()=>{this.setState({value:'patient'})}}
                        >
                            <Text style={styles.modalButtonText} >Patient</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{textAlign:'center', marginTop:20, fontSize:20, }}>You are {this.state.value}</Text>
                    <TextInput
                        placeholder="Email"
                        onChangeText={(text)=>{this.setState({email_id:text})}}
                        style={[styles.modalInputBox,{marginTop:20}]}
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder="Create Password"
                        onChangeText={(text)=>{this.setState({create_password:text})}}
                        style={styles.modalInputBox}
                        secureTextEntry={true}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        onChangeText={(text)=>{this.setState({confirm_password:text})}}
                        style={styles.modalInputBox}
                        secureTextEntry={true}
                    />
                    
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={()=>{this.userSignUp()}}
                    >
                        <Text style={styles.buttonText} >Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonStyle,{marginBottom:40}]}
                        onPress={()=>{this.setState({isModalVisible:false})}}
                    >
                        <Text style={styles.buttonText} >Cancel</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                </ScrollView>
            </Modal>
        );
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:"#a0e5ff"}}>
                {
                    this.showModal()
                }
                <View style={{backgroundColor:"#2089DC", width:"100%"}}>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white', textAlign:'center', padding:10}}>Welcome Screen</Text>
                </View>
                
                <View>
                    <TextInput 
                        placeholder="abc@gmail.com"
                        style={styles.inputBox}
                        onChangeText={(text)=>{this.setState({email:text})}}
                        keyboardType="email-address"
                    />
                    <TextInput 
                        placeholder="Password"
                        style={styles.inputBox}
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState({password:text})}}
                    />
                </View>
                <View>
                    <TouchableOpacity 
                        style={[styles.buttonStyle, {marginTop:100}]}
                        onPress={()=>{this.userLogin()}}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress={()=>{this.setState({isModalVisible:true})}}
                    >
                        <Text style={styles.buttonText}>Sing Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle:{
        alignSelf:'center',
        padding:10,
        backgroundColor:"#0070FF",
        marginTop:60,
        width:240,
        alignItems:'center',
        borderRadius:14,
        shadowColor:"black",
        shadowOffset:{width:0, height:8},
        shadowOpacity:0.44,
        elevation:0.40,
    },
    buttonText:{
        color:"white",
        fontSize:20,
        fontWeight:'bold'
    },
    inputBox:{
        marginTop:60,
        alignSelf:'center',
        width:280,
        borderBottomWidth:1.4,
        paddingLeft:5,
        fontSize:20
    },
    textStyle:{
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center',
        color:"#ffffff"
    },
    textContainer:{
        padding:14,
        backgroundColor:"#2089DC"
    },
    modalInputBox:{
        marginTop:40,
        width:280,
        borderWidth:1.4,
        borderRadius:5,
        paddingLeft:6,
        fontSize:18,
        alignSelf:'center'
    },
    modalButtonStyle:{
        width:120,
        padding:6,
        borderWidth:1,
        borderRadius:10
    },
    modalButtonText:{
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    }
})