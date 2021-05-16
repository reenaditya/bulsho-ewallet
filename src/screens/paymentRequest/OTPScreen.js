import React, {useEffect,useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import {OTPStyle as styles} from './Style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import { DepositRequestOtpValidate } from '../../services/DepositService';
import AsyncStorage from '@react-native-community/async-storage';

const OTPScreen = ({navigation,route}) => {

    const otpTextInput = [];

    const inputs = Array(4).fill(0);

    const {phone_number} = route.params;

    const [otp,setOtp] = useState({a:'',b:'',c:'',d:''});
    const input_1 = React.createRef();
    const input_2 = React.createRef();
    const input_3 = React.createRef();
    const input_4 = React.createRef();

    useEffect(() => {
        //console.log(otpTextInput.length)
    },[])

    const onContinue = async () => {

        const otpcombine = otp.a+otp.b+otp.c+otp.d;

        if (otpcombine.length == 4) {
            
            const token = await AsyncStorage.getItem('token');
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            await DepositRequestOtpValidate({otp:otpcombine},headers)
            .then(res => {

                Alert.alert(
                    "Success",
                    res.data.message,[
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('PaymentRequestScreen'),
                        style: "cancel"
                    }]
                );

            }).catch(err => {
        
                Alert.alert(
                    "Error",
                    "OTP invalid",[
                    {
                        text: "OK",
                        style: "cancel"
                    }]
                );
            })
                
        }else{

            Alert.alert(
                "Error",
                "OTP invalid",[
                {
                    text: "OK",
                    style: "cancel"
                }]
            );
        }
        //navigation.navigate('HomeScreen')
    }

    const renderInputs = () => {


        const txt = inputs.map((i, j) => {

            return (
                <View style={{width: '20%'}} key={j}>
                    <Input
                    keyboardType={'number-pad'}
                    textAlign={'center'}
                    maxLength={1}
                    autoFocus={j === 0 ? true:false}
                   // onChangeText={v => focusNext(j, v)}
                    //onKeyPress={e => focusPrevious(e.nativeEvent.key, j)}
                    ref={ref => otpTextInput[j] = ref}
                    />
                </View>
            )
        });

        return txt;
    }

    const focusPrevious = (key, index) => {
        if (key === 'Backspace' && index !== 0)
            otpTextInput[index - 1]._root.focus();
    }

    const focusNext = (index, value) => {
        if (index < otpTextInput.length - 1 && value) {
            otpTextInput[index + 1]._root.focus();
        }
        if (index === otpTextInput.length - 1) {
            otpTextInput[index]._root.blur();
        }
       /* const otp = this.state.otp;
        otp[index] = value;
        this.setState({ otp });
        this.props.getOtp(otp.join(''));*/
    }
    const otpField = (value,index) => {

        switch (index) {
            case 1:
                value?input_2.current.focus():''
                setOtp({...otp,a:value})
                break;
            case 2:
                value?input_3.current.focus():''
                setOtp({...otp,b:value})
                break;
            case 3:
                value?input_4.current.focus():''
                setOtp({...otp,c:value})
                break;
            case 4:
                setOtp({...otp,d:value})
                break;
        }
        
    }

    return(
        <View style={styles.main}>
        <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{alignItems: 'center'}} >
        <View style={styles.container}>
            
            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}> Enter the 4-digit code sent to you at </Text>
                <Text style={styles.numberShow}>{phone_number}</Text>
               <View
                style={{
                    flexDirection: 'row',
                    width: '90%',
                    justifyContent: 'center',
                }}>
                    <View style={{width: '20%'}}>
                        <Input
                            
                            ref={input_1}
                            keyboardType={'number-pad'}
                            textAlign={'center'}
                            maxLength={1}
                            onChangeText={value => otpField(value,1)}
                            autoFocus={true}
                        />
                    </View>
                    <View style={{width: '20%'}}>
                        <Input
                            ref={input_2}
                            keyboardType={'number-pad'}
                            textAlign={'center'}
                            maxLength={1}
                            onChangeText={value => otpField(value,2)}
                            autoFocus={false}
                        />
                    </View>
                    <View style={{width: '20%'}}>
                        <Input
                            ref={input_3}
                            keyboardType={'number-pad'}
                            textAlign={'center'}
                            maxLength={1}
                            onChangeText={value => otpField(value,3)}
                            autoFocus={false}
                        />
                    </View>
                    <View style={{width: '20%'}}>
                        <Input
                            ref={input_4}
                            keyboardType={'number-pad'}
                            textAlign={'center'}
                            maxLength={1}
                            onChangeText={value => otpField(value,4)}
                            autoFocus={false}
                        />
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot_button}>Resend Code</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn} onPress={onContinue.bind(this)}>
                    <Text style={styles.loginText} >Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                
            </View>
        </View>
            </ScrollView>
        </View>
    );
}

export default OTPScreen