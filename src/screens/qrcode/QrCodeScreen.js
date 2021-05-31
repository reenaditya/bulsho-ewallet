import React, {useState,useEffect} from "react";
import QRCode from 'react-native-qrcode-generator';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const QrCodeScreen = ({route}) => {

	return (
      <View style={styles.container}>
       
        <QRCode
          value={route.params.mobile_number}
          size={200}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});

export default QrCodeScreen;