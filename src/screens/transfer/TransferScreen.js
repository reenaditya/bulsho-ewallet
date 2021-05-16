import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { transferAPI } from '../../services/TransferService';
import AsyncStorage from '@react-native-community/async-storage';

const errInit = {
	mobile_numberError:'',
	amountError:''
};

export default function TransferScreen({navigation}){

	const [state,setState] = useState({
		mobile_number:'',
		amount:''
	});
    
	const [errState,setErrState] = useState(errInit);

	const clear = () => {
		setErrState(errInit)
	}

	const transferProceed = async () => {

		const token = await AsyncStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        transferAPI(state,headers)
        .then(async res => {
        	setErrState(errInit)

        	await AsyncStorage.setItem('user_info', JSON.stringify(res.data.data[0]));

        	Alert.alert(
      			"Success",
      			"Fund Transferred",[{
	          		text: "Back to home",
	          		onPress: () => navigation.navigate('HomeScreen')
        		},
        		{
          			text: "Cancel",
          			onPress: () => setState({mobile_number:'',amount:''}),
          			style: "cancel"
        		},
        		]
    		);
        	
        }).catch(async err => {


        	if (err.response.data.length && err.response.data.length == 2) {


        		setErrState({
        			mobile_numberError: err.response.data[0].message,
					amountError:  err.response.data[1].message
				})
					

        	}else if(err.response.data.length){

        		if (err.response.data[0].field == 'mobile_number') {
        			setErrState({mobile_numberError: err.response.data[0].message})	
        		}else{
        			setErrState({amountError: err.response.data[0].message})	
        		}
        	}
        	
        })
	}
  	
	
	return (
		<View style={styles.container}>
		<SafeAreaView style={{flex:1}}> 
		<ScrollView>
		 	<View style={[styles.heading,{
		 			alignItems:'center'
		 		}]}>
		 		
		 	</View>
		 	<View style={styles.subHeading}>
		 		

		 		<View style={styles.inputView}>
				   <Input
				    label="Enter Phone Number"
				    labelStyle={{fontSize:12}}
				    placeholder="Enter Phone Number"
				    value={state.mobile_number}
				    style={styles.TextInput}
				    keyboardType = "number-pad"
				    errorMessage={errState.mobile_numberError}
                	errorStyle={{color:'grey'}}
                	onChangeText={value => setState({...state,mobile_number:value})}
				    leftIcon={
				        <Icon
				          name='phone'
				          size={16}
				          color='black'
				        />
				    }
				    />       
      			</View>
      			 <View style={styles.inputView}>
			     <Input
				    label="Amount"
				    labelStyle={{fontSize:12}}
				    placeholder="Enter amount"
				    value={state.amount}
				    style={styles.TextInput}
				    keyboardType = "number-pad"
				    errorMessage={errState.amountError}
                	errorStyle={{color:'grey'}}
				    onChangeText={value => setState({...state,amount:value})}
				    leftIcon={
				        <Icon
				          name='money'
				          size={16}
				          color='black'
				        />
				    }
				    />  
			         
			    </View>
			    
			    <TouchableOpacity style={styles.loginBtn} onPress={() => transferProceed()}>
        			<Text style={styles.loginText} >Send</Text>
      			</TouchableOpacity>
			</View>
		 	<View style={styles.footer}>
		 		
		 	</View>
		 	</ScrollView>
		 	</SafeAreaView>
		</View>
	);
}