import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ListItem, Icon } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

export default class NotificationScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        },
        this.requestRef=null
    }

    getAllNotification=async()=>{
        this.requestRef = db.collection("notifications").where("targated_user_id", "==", this.state.userId)
        .where("status", "==", "unread")
        .onSnapshot((snapshot)=>{
            var notifi= snapshot.docs.map((doc)=> {return doc.data()} )
            this.setState({allNotifications:notifi})
            console.log(this.state.allNotifications)
        })
    }

    componentDidMount=()=>{
        this.getAllNotification()
    }

    componentWillUnmount=()=>{
        this.requestRef()
    }

    keyExtractor= (item, index) => index.toString();

    renderItem=({item, i}) => {
        return(
            <ListItem
                key={i}
                title={item.message}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                rightElement={
                    <Icon name="trash" type="font-awesome" onPress={()=>{
                        db.collection("notifications").where("notification_id", "==", item.notification_id)
                        .get()
                        .then((snapshot)=>{
                            snapshot.forEach((doc)=>{
                                db.collection("notifications").doc(doc.id).update({
                                    status:'read'
                                })
                            })
                        })
                    }} ></Icon>
                }
                bottomDivider
            />
        );
    }

    render(){
        return(
            <ScrollView style={{flex:1, backgroundColor:"#A0E5FF"}} >
                <AppHeader title="Notifications" navigation={this.props.navigation} />
                {
                    this.state.allNotifications.length===0?(
                        <View>
                            <Text style={{fontSize:20, marginTop:200, textAlign:'center'}}>No Notifications</Text>
                        </View>
                    ):(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allNotifications}
                            renderItem={this.renderItem}
                        ></FlatList>
                    )
                }
            </ScrollView>
        );
    }
}