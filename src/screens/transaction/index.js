import React, { Component, useEffect,useState } from 'react';  
import { 
    FlatList,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert } from 'react-native';  
import Theme from '../../constant/Theme'
import OTPInputView from 'react-native-otp-input'
import { DepositRequestList,DepositRequestReply } from '../../services/DepositService';
import { TransactionList } from '../../services/TransactionService'
import AsyncStorage from '@react-native-community/async-storage';
import { Badge } from 'react-native-elements';
  
const PaymentRequestScreen = ({navigation}) => { 

    const Width = Dimensions.get('window').width;
    const [data,setData] = useState([]);
    const [userData,setUserData] = useState('');
    const [status,setStatus] = useState();
    
    useEffect(async () => {

        const token = await AsyncStorage.getItem('token');
        const userInfo = await AsyncStorage.getItem('user_info');
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        await setUserData(JSON.parse(userInfo));
        await TransactionList(headers)
        .then(res => {
            setData(res.data.data)
        }).catch(err =>{

        })
    },[])
  
    const renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: Width,  
                    backgroundColor: Theme.themeColor2,   
                }}  
            />  
        );  
    }; 
    const getStatus = (status) => {
        
        switch (status) {
            case 0:
                return {
                    color: 'yellow',
                    text: 'Pending'
                }
            break;
            case 1:
                return {
                    color: 'green',
                    text: 'Accepted'
                }
            break;
            case 2:
                return {
                    color: 'green',
                    text: 'Completed'
                }
            break;
            case 3:
                return {
                    color: 'red',
                    text: 'Rejected'
                }
            break;
            
        }            
    }
    const getListViewItem = async (item) => {  
        
        const token = await AsyncStorage.getItem('token');
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        Alert.alert(
            "Recharge amount",
            `K ${item.deposit_amount.toFixed(2)}`,
            [{ 
                text: "Close", 
                style: "cancel" 
            },{
                text: "Reject",
                onPress: () => console.log("Cancel Pressed"),
                style: "destructive"
            },{ 
                text: "Accept", 
                onPress: () => {

                    DepositRequestReply({
                        deposit_id: item.id,
                        status:1
                    },headers).then(res => {
                        navigation.navigate('OTPScreen',{phone_number: item.user.mobile_number})
                    }).catch(err => {
                        console.log(JSON.stringify(err.response))
                    })
                },
                style: "default"
            },]
        );
    }  

    return (  
        <View style={styles.container}>  
            <FlatList  
                data={data}  
                renderItem={({item}) =>
                    <TouchableOpacity>  
                    <View style={{
                        height:100,
                        width: Width ,
                        borderRadius:15,
                        backgroundColor:Theme.themeColor,
                    }}>
                    
                    <Text style={{paddingLeft:10,paddingTop:10}} >
                        User Name : { userData.id === item.sender.id ? item.receiver.name : item.sender.name }
                    </Text>
                    <Text style={{paddingLeft:10}}>
                        Mobile Number : {userData.id === item.sender.id ? item.receiver.mobile_number : item.sender.mobile_number }
                    </Text>
                    <Text style={{paddingLeft:10}}>
                        {userData.id === item.sender.id ? 'Outcome':'Income' } Amount :  {Theme.currency} {item.transaction_amount.toFixed(2)}
                    </Text>
                 
                    </View>
                    </TouchableOpacity>
                }  
                ItemSeparatorComponent={renderSeparator}  
                />  
        </View>  
        );  
      
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1, 
        alignItems: "center",
        width:'100%',
        backgroundColor: Theme.themeColor2
    },  
    item: {  
        padding: 10,
        fontSize: 18,  
    },  
})  
  
  
export default PaymentRequestScreen