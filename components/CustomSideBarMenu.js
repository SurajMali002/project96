import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{ flex: 1, backgroundColor:"white" }}>
                <View>
                    <DrawerItems {...this.props} />
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{
                            this.props.navigation.navigate("WelcomeScreen")
                            firebase.auth().signOut()
                        }}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle:{
        alignSelf:'center',
        backgroundColor:"#0070FF",
        width:"100%",
        
    },
    buttonText:{
        textAlign:'center',
        fontSize:20,
        padding:10,
        fontWeight:"bold",
        color:'white'
    }
})