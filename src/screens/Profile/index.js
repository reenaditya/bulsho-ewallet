import React, { useEffect,useState } from "react";
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
  Alert,
  ActivityIndicator
} from "react-native";
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { emailExists } from '../../services/RegisterService';
import * as ProfileService from '../../services/ProfileService';
import Theme from '../../constant/Theme'

export default function ProfileScreen({navigation}){

	const [animating,setAnimating] = useState(false);
	const [error,setError] = useState({
		email:'',
		name:''
	});
	const [userData,setUserData] = useState({name:'',email:''});
	
  	useEffect(async () => {
		setUserData(JSON.parse(await AsyncStorage.getItem('user_info')));
  	},[])
  	
  	const nextScreen = async () => {
		
		setAnimating(true);

		let errorMessage = {
			email:'',
			name:''
		};
		
  		if (userData.name && userData.email ) {
			
			const token = await AsyncStorage.getItem('token');

        	let headers = {
            	'Content-Type': 'application/json',
            	'Authorization': `Bearer ${token}`
        	}
        	
  			await ProfileService.emailExists({email:userData.email},headers)
  			.then(async res => {
				
				await ProfileService.update({
					name: userData.name,
					email: userData.email,
				},headers).then(async res => {
					
					await AsyncStorage.setItem('user_info',JSON.stringify(userData))

					Alert.alert(
                    	"Success",
                    	'Profile Updated',[
                    	{
                        	text: "OK",
                        	style: "cancel"
                    	}]
                	);
				}).catch(err =>{

					Alert.alert(
                    	"Error",
                    	err.response.data.message,[
                    	{
                        	text: "OK",
                        	style: "cancel"
                    	}]
                	);
				})

  			})
  			.catch(err => {

  				console.log(err.response)
  				errorMessage.email = err.response.data.message;
				setError(errorMessage)
  			})


  		}else{
			
			if (userData.email == "") {
				errorMessage.email = 'Email is required field';
			}else{
				errorMessage.email = '';
			}
			if (userData.name == "") {
				errorMessage.name = 'Name is required field';	
			}else{

				errorMessage.name = '';	
			}
			
			setError(errorMessage)
  		}

  		setAnimating(false);

  	}
	
	return (
		<View style={styles.container}>
		<SafeAreaView style={{flex:1}}> 
		<ScrollView>
		 	<View style={[styles.heading,{
		 			alignItems:'center',
		 			height:10
		 		}]}>
		 	</View>
		 	<View style={styles.subHeading}>
		 		<Text style={styles.subHeadingText}> Update Your Profile </Text>
				
				<View style={[styles.inputView,error.name?{marginBottom:60}:{}]}>
				    <Input
				    label="Your Name"
				    placeholder="Enter Your Name"
				    labelStyle={{fontSize:12}}
				    errorMessage={error.name}
				    style={styles.TextInput}
				    onChangeText={value => setUserData({...userData,name: value})}
				    value={userData.name}
				    leftIcon={
				        <Icon
				          name='user'
				          size={16}
				          color='black'
				        />
				    }
				    />      
      			</View>

		 		<View style={[styles.inputView,error.email?{marginBottom:60}:{}]}>
				    <Input
				    label="Your Email"
				    placeholder="Enter Your Email"
				    labelStyle={{fontSize:12}}
				    errorMessage={error.email}
				    style={styles.TextInput}
				    value={userData.email}
				    onChangeText={value => setUserData({...userData,email: value})}
				    leftIcon={
				        <Icon
				          name='envelope'
				          size={16}
				          color='black'
				        />
				    }
				    />      
      			</View>
      		    
			    
			    {animating?(
            
            		<ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
            	):(
            	<TouchableOpacity style={styles.loginBtn}  onPress={nextScreen.bind(this)}>
                	<Text style={styles.loginText}>Update</Text>
            	</TouchableOpacity>
        		)}
			    
			</View>
		 	<View style={styles.footer}>
		 		
		 	</View>
		 	</ScrollView>
		 	</SafeAreaView>
		</View>
	);
}