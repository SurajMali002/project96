import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import AppHeader from '../components/AppHeader';

export default class MyConsultations extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            allPatients: [],
            MyRequests: [],
            value: ""
        },
            this.requestRef = null,
            this.myRequestRef = null
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    getUserData = () => {
        db.collection("users").where("email_id", "==", this.state.userId)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({ value: doc.data().value })
                    console.log(this.state.value)
                })
            })
    }

    getMyRequests = async () => {
        this.myRequestRef = db.collection("accepted_request").where("patient_id", "==", this.state.userId)
            .onSnapshot((snapshot) => {
                var requests = snapshot.docs.map((doc) => { return doc.data() })
                this.setState({ MyRequests: requests })
                console.log(this.state.MyRequests)
            })
    }

    getMyPatients = async () => {
        this.requestRef = db.collection("accepted_request").where("doctor_id", "==", this.state.userId)
            .onSnapshot((snapshot) => {
                var patients = snapshot.docs.map((doc) => { return doc.data() })
                console.log(patients)
                this.setState({ allPatients: patients })
            })
    }

    componentDidMount = () => {
        this.getMyPatients()
        this.getUserData()
        this.getMyRequests()
    }

    componentWillUnmount = () => {
        this.requestRef()
        this.myRequestRef()
    }

    keyExtractor1 = (item, index) => index.toString()

    renderItem1 = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.patient_name}
                subtitle={item.patient_problem}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                rightElement={
                    <Text>Contact of Patient : {item.patient_contact}</Text>
                }
                bottomDivider
            ></ListItem>
        );
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.patient_problem}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                rightElement={
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                        db.collection("requests").where("request_id", "==", item.request_id)
                            .get()
                            .then((snapshot) => {
                                snapshot.forEach((doc) => {
                                    if (doc.data().status !== "Fine") {
                                        db.collection("requests").doc(doc.id).update({
                                            status: "Fine"
                                        })
                                        db.collection("notifications").add({
                                            notification_id: this.createUniqueId(),
                                            patient_name: item.patient_name,
                                            targated_user_id: item.doctor_id,
                                            message: "Your patient " + item.patient_name + " is fine now, thank you for your help.",
                                            status: "unread"
                                        })
                                    }
                                })
                            })
                    }}>
                        <Text style={styles.buttonText}>I am Fine now</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            ></ListItem>
        );
    }

    render() {
        if (this.state.value === "doctor") {
            return (
                <ScrollView style={{ flex: 1, backgroundColor: "#A0E5FF" }}>
                    <AppHeader title="My Patients" navigation={this.props.navigation} />
                    {
                        this.state.allPatients.length === 0 ? (
                            <View>
                                <Text style={{ marginTop: 200, textAlign: 'center', fontSize: 20 }}>No Patients</Text>
                            </View>
                        ) : (
                            <FlatList
                                keyExtractor={this.keyExtractor1}
                                data={this.state.allPatients}
                                renderItem={this.renderItem1}
                            ></FlatList>
                        )
                    }
                </ScrollView>
            );
        } else if (this.state.value === "patient") {
            return (
                <ScrollView style={{ flex: 1, backgroundColor: "#A0E5FF" }}>
                    <AppHeader title="My Requests" navigation={this.props.navigation} />
                    {
                        this.state.MyRequests.length === 0 ? (
                            <View>
                                <Text style={{ marginTop: 200, textAlign: 'center', fontSize: 20 }}>No Requests</Text>
                            </View>
                        ) : (
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.MyRequests}
                                renderItem={this.renderItem}
                            ></FlatList>
                        )
                    }
                    <View style={{ display: "flex", flexDirection: 'row' }}>
                        <Icon name="info-circle" type="font-awesome" />
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>There Will be only the list of Consultations which are accepted by some doctors</Text>
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: "#A0E5FF" }}>
                    <Text style={{ marginTop: 200, textAlign: 'center', fontSize: 20 }}>Loading...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: "#0070FF",
        marginTop: 0,
        width: 120,
        alignItems: 'center',
        borderRadius: 14,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.44,
        elevation: 0.40,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold'
    },
})