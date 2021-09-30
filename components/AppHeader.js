import * as React from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import {
    View
} from 'react-native'
import db from '../config'
import firebase from 'firebase';


export default class AppHeader extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            value:''
        }
    }

    getNumberOfUnreadNotifications(){
        db.collection('notifications').where('status','==',"unread").where('targated_user_id','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var unreadNotifications = snapshot.docs.map((doc) => doc.data())
            this.setState({
                value: unreadNotifications.length
            })
        })
    }

    componentDidMount=()=>{
        this.getNumberOfUnreadNotifications()
    }

    BellIconWithBadge=()=>{
        return(
          <View>
            <Icon name='bell' type='font-awesome' color='#ffffff' size={25}
              onPress={() =>this.props.navigation.navigate('NotificationScreen')}/>
             <Badge
              value={this.state.value}
             containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
          </View>
        )
      }
    
    render(){
        return(
            <Header
            centerComponent={{ text: this.props.title, style: { color: '#ffffff', fontSize:20,fontWeight:"bold", } }}
            leftComponent={<Icon name='bars' type='font-awesome' color='#ffffff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
            rightComponent={<this.BellIconWithBadge {...this.props} />}
            ></Header>
        );
    }
}