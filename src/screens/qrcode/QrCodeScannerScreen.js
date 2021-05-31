import React, {useState,useEffect}from "react";
import QRCode from 'react-native-qrcode-generator';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QrCodeScannerScreen = ({navigation}) => {

    const onSuccess = e => {
        
        navigation.navigate('TransferScreen',{
            mobile_number: e.data
        });
    };
	return (
      <QRCodeScanner
        onRead={onSuccess.bind(this)}
        checkAndroid6Permissions={true}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />
    );
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default QrCodeScannerScreen;