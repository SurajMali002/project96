import * as React from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList
} from 'react-native';
import AppHeader from '../components/AppHeader';
import firebase from 'firebase';
import db from '../config';
import {ListItem} from 'react-native-elements'

export default class RequestScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            problem:'',
            first_name:'',
            last_name:'',
            contact:'',
            address:'',
            value:'',
            requests:[]
        },
        this.requestRef=null
    }

    getRequests=async()=>{
        this.requestRef = db.collection("requests").where("status", "==", "requested")
        .onSnapshot((snapshot)=>{
            var requestedPatients = snapshot.docs.map((doc)=>{return doc.data()})
            this.setState({requests:requestedPatients})
            console.log(this.state.requests)
        })
    }

    getUserData=async()=>{
        db.collection("users").where("email_id", "==", this.state.userId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({first_name:doc.data().first_name})
                this.setState({last_name:doc.data().last_name})
                this.setState({contact:doc.data().contact})
                this.setState({address:doc.data().address})
                this.setState({value:doc.data().value})
                console.log("Full Name : " + this.state.first_name + " " + this.state.last_name)
                console.log("Contact : " + this.state.contact)
                console.log("Address : " + this.state.address)
                console.log("Value : " + this.state.value)
                console.log("Email : " + this.state.userId)
            })
        })
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    userSubmmit=async()=>{
        var random = this.createUniqueId()
        if(this.state.problem===""){
            return Alert.alert("Input Box is empty")
        }else{
            db.collection("requests").add({
                problem:this.state.problem,
                name:this.state.first_name + " " + this.state.last_name,
                contact:this.state.contact,
                address:this.state.address,
                email_id:this.state.userId,
                status:"requested",
                request_id:random
            })
            .then(()=>{
                return Alert.alert("Request Done")
            })
        }
    }

    componentDidMount=()=>{
        this.getUserData()
        this.getRequests()
    }

    componentWillUnmount=()=>{
        this.requestRef()
    }

    keyExtractor= (item, index) => index.toString();

    renderItem=({item, i}) => {
        return(
            <ListItem
                key={i}
                title={item.name}
                subtitle={item.problem}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                rightElement={
                    <TouchableOpacity
                        style={[styles.buttonStyle,{width:100, marginTop:0}]}
                        onPress={()=>{this.props.navigation.navigate("PatientDetailsScreen", {details:item})}}
                    >
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        );
    }

    render(){
        if(this.state.value==="doctor"){
            return(
                <KeyboardAvoidingView style={{flex:1, backgroundColor:"#A0E5FF"}} >
                    <ScrollView>
                        <AppHeader title="Requests Of Patients" navigation={this.props.navigation}/>
                        <View>
                            {
                                this.state.requests.length===0?(
                                    <View>
                                        <Text style={{marginTop:200, textAlign:'center', fontSize:20}} >There are no requests now</Text>
                                    </View>
                                ):(
                                    <FlatList
                                        keyExtractor={this.keyExtractor}
                                        data={this.state.requests}
                                        renderItem={this.renderItem}
                                    ></FlatList>
                                )
                            }
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }else if(this.state.value==="patient"){
            return(
                <KeyboardAvoidingView style={{flex:1, backgroundColor:"#A0E5FF"}} >
                    <ScrollView>
                        <AppHeader title="Request Here" navigation={this.props.navigation} />
                        <View>
                            <TextInput
                                placeholder="Write your problem here"
                                multiline={true}
                                value={this.state.problem}
                                style={styles.inputBox}
                                onChangeText={(text)=>{this.setState({problem:text})}}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={()=>{
                                    this.userSubmmit()
                                    this.setState({problem:''})
                                }}
                            >
                                <Text style={styles.buttonText} >Submmit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }else{
            return(
                <View style={{flex:1, backgroundColor:"#A0E5FF"}}>
                    <Text style={{fontSize:20, marginTop:200, textAlign:'center'}}>Loading...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    inputBox:{
        width:280,
        height:100,
        alignSelf:'center',
        borderWidth:0.8,
        borderRadius:8,
        paddingLeft:6,
        paddingRight:6,
        marginTop:40,
        borderColor:"#0070FF"
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