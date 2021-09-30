import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import AppHeader from '../components/AppHeader';
import firebase from 'firebase';
import db from '../config';
import { ListItem, Card } from 'react-native-elements';

export default class MyOrders extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            myOrders:[],
            isModalVisible:false
        },
        this.requestRef=null
    }

    getMyOrder=async()=>{
        this.requestRef = db.collection("orders").where("email_id", "==", this.state.userId)
        .onSnapshot((snapshot)=>{
            var myorder = snapshot.docs.map((doc)=>{return doc.data()})
            this.setState({myOrders:myorder})
            console.log(this.state.myOrders)
        })
    }

    componentDidMount=()=>{
        this.getMyOrder()
    }

    componentWillUnmount=()=>{
        this.requestRef()
    }

    keyExtractor=(item, index)=>index.toString()

    renderItem=({item, i})=>{
        return(
            <ListItem
                key={i}
                title={item.medicines[0] + ", etc..."}
                subtitle={item.status}
                titleStyle={{color:"#000", fontWeight:"bold"}}
                rightElement={
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={()=>{this.props.navigation.navigate("MyOrderDetails", {details:item})}}
                    >
                        <Text style={styles.buttonText}>Order Details</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            ></ListItem>
        );
    }

    render(){
        return(
            <ScrollView>
                <AppHeader title="My Orders" navigation={this.props.navigation} />
                {
                    this.state.myOrders.length===0?(
                        <View>
                            <Text>No Orders</Text>
                        </View>
                    ):(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.myOrders}
                            renderItem={this.renderItem}
                        ></FlatList>
                    )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle:{
        alignSelf:'center',
        padding:10,
        backgroundColor:"#0070FF",
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
})