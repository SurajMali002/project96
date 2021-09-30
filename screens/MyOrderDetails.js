import * as React from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import AppHeader from '../components/AppHeader';
import { Card } from 'react-native-elements';

export default class MyOrderDetails extends React.Component{

    constructor(props){
        super(props);
        this.state={
            medicines:this.props.navigation.getParam("details")["medicines"],
            status:this.props.navigation.getParam("details")["status"]
        }
    }

    render(){
        return(
            <ScrollView>
                <AppHeader title="My Order Details" navigation={this.props.navigation} />
                <Card title="Order Details" >
                    <Card>
                        {
                            this.state.medicines[0]!==""?(
                                <Text>1. {this.state.medicines[0]}</Text>
                            ):(undefined)
                        }
                        {
                            this.state.medicines[1]!==""?(
                                <Text>2. {this.state.medicines[1]}</Text>
                            ):(undefined)
                        }
                        {
                            this.state.medicines[2]!==""?(
                                <Text>3. {this.state.medicines[2]}</Text>
                            ):(undefined)
                        }
                        {
                            this.state.medicines[3]!==""?(
                                <Text>4. {this.state.medicines[3]}</Text>
                            ):(undefined)
                        }
                        {
                            this.state.medicines[4]!==""?(
                                <Text>5. {this.state.medicines[4]}</Text>
                            ):(undefined)
                        }
                        <Text>Status: {this.state.status}</Text>
                    </Card>
                </Card>
            </ScrollView>
        );
    }
}