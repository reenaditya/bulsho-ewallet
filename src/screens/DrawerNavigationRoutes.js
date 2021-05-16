import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './home/HomeScreen';
import TransferScreen from './transfer/TransferScreen';
import PaymentScreen from './payment/PaymentScreen';
import Transaction from './transaction';
import VendorListScreen from './payment/VendorListScreen';
import Profile from './Profile';
import PaymentRequestScreen from './paymentRequest/PaymentRequestScreen';
import OTPScreen from './paymentRequest/OTPScreen';
import Theme from '../constant/Theme'
import { Dimensions } from 'react-native';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Width = Dimensions.get('window').width;

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="TransferScreen"
            component={TransferScreen}
            options={{
                title: 'Transfer',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
                title: 'Recharge',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="VendorListScreen"
            component={VendorListScreen}
            options={{
                title: 'Recharge',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="OTPScreen"
            component={OTPScreen}
            options={{
                title: 'OTP',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="PaymentRequestScreen"
            component={PaymentRequestScreen}
            options={{
                title: 'Recharge Request',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="Transaction"
            component={Transaction}
            options={{
                title: 'Transaction',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
                title: 'Profile',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
    </Stack.Navigator>
  );
};

/*const settingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};*/

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        component={homeScreenStack}
      />
      {/*<Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: 'Setting Screen'}}
        component={settingScreenStack}
      />*/}
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;