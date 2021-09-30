import * as React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import RequestScreen from './screens/RequestScreen';
import BuyMedicineScreen from './screens/BuyMedicineScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';
import MyConsultations from './screens/MyConsultations';
import SettingScreen from './screens/SettingScreen';
import NotificationScreen from './screens/NotificationScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomSideBarMenu from './components/CustomSideBarMenu';
import MyOrders from './screens/MyOrders';
import MyOrderDetails from './screens/MyOrderDetails';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
      );
    }
  }

  const MyOrderStackNavigator = createStackNavigator({
    MyOrders:{
      screen:MyOrders,
      navigationOptions:{
        headerShown:false
      }
    },
    MyOrderDetails:{
      screen:MyOrderDetails,
      navigationOptions:{
        headerTitle:"My Order Details"
      }
    }
  })
  
  const AppStackNavigator = createStackNavigator({
    RequestScreen:{
      screen:RequestScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    PatientDetailsScreen:{
      screen:PatientDetailsScreen,
      navigationOptions:{
        headerTitle:"Details"
      }
    }
  })

  const AppTabNavigator = createBottomTabNavigator({
    StackNavigator:{
      screen:AppStackNavigator,
      navigationOptions :{
        tabBarIcon : <Image source={require("./components/request.png")} style={{width:30, height:30}}/>,
        tabBarLabel : " ",
      }
    },
    BuyMedicineScreen:{
      screen:BuyMedicineScreen,
      navigationOptions:{
        tabBarIcon: <Image source={require("./components/medicine.png")} style={{width:34, height:34}} />,
        tabBarLabel: " "
      }
    }
  })

const AppDrawerNavigator = createDrawerNavigator({
  Home:{
    screen:AppTabNavigator
  },
  MyConsultations:{
    screen:MyConsultations,
    navigationOptions:{
      drawerLabel:"My Consultations"
    }
  },
  SettingScreen:{
    screen:SettingScreen,
    navigationOptions:{
      drawerLabel:"Update Profile"
    }
  },
  NotificationScreen:{
    screen:NotificationScreen,
    navigationOptions:{
      drawerLabel:"Notifications"
    }
  },
  MyOrders:{
    screen:MyOrderStackNavigator,
    navigationOptions:{
      drawerLabel:"My Orders"
    }
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
)



const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  AppTabNavigator:{screen:AppDrawerNavigator}
})


const AppContainer = createAppContainer(SwitchNavigator)
