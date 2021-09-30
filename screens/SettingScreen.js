import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import AppHeader from '../components/AppHeader';
import { Alert } from 'react-native';

export default class SettingScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            first_name:'',
            last_name:'',
            contact:'',
            address:''
        }
    }

    getUserDetails=async()=>{
        db.collection("users").where("email_id", "==", this.state.userId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    first_name:doc.data().first_name,
                    last_name:doc.data().last_name,
                    contact:doc.data().contact,
                    address:doc.data().address
                })
            })
        })
    }

    updateProfile=async()=>{
        db.collection("users").where("email_id", "==", this.state.userId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection("users").doc(doc.id).update({
                    first_name:this.state.first_name,
                    last_name:this.state.last_name,
                    contact:this.state.contact,
                    address:this.state.address
                })
                .then(()=>{
                    return Alert.alert("Profile Updated")
                })
            })
        })
    }

    componentDidMount=()=>{
        this.getUserDetails()
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex:1, backgroundColor:"#A0E5FF"}}>
                <AppHeader title="Settings" navigation={this.props.navigation} />
                <ScrollView>
                    <View>
                        <TextInput
                            placeholder="First Name"
                            style={styles.inputBox}
                            value={this.state.first_name}
                            onChangeText={(text)=>{this.setState({first_name:text})}}
                        />
                        <TextInput
                            placeholder="Last Name"
                            style={styles.inputBox}
                            value={this.state.last_name}
                            onChangeText={(text)=>{this.setState({last_name:text})}}
                        />
                        <TextInput
                            placeholder="Contact"
                            style={styles.inputBox}
                            value={this.state.contact}
                            onChangeText={(text)=>{this.setState({contact:text})}}
                        />
                        <TextInput
                            placeholder="address"
                            style={styles.inputBox}
                            value={this.state.address}
                            onChangeText={(text)=>{this.setState({address:text})}}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={()=>{this.updateProfile()}}
                        >
                            <Text style={styles.buttonText}>
                                Update
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    inputBox:{
        width:280,
        borderWidth:1.4,
        borderRadius:4,
        paddingLeft:5,
        fontSize:18,
        marginTop:40,
        alignSelf:'center'
    },
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
    }
})