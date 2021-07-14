import React, {Component, useEffect, useState} from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Theme from '../../constant/Theme';
import OTPInputView from 'react-native-otp-input';
import * as ProfileService from '../../services/ProfileService';
import AsyncStorage from '@react-native-community/async-storage';
import {Badge} from 'react-native-elements';

const PaymentRequestScreen = ({navigation}) => {
  const Width = Dimensions.get('window').width;
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState('');
  const [status, setStatus] = useState();

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    const userInfo = await AsyncStorage.getItem('user_info');
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await setUserData(JSON.parse(userInfo));
    await ProfileService.vendorList(headers)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {});
  }, []);

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
  const nextScreen = item => {
    navigation.navigate('PaymentScreen', {
      mobile_number: item.mobile_number,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => nextScreen(item)}>
            <View
              style={{
                height: 80,
                width: Width,
                borderRadius: 5,
                backgroundColor: Theme.themeColor,
              }}>
              <Text style={{paddingLeft: 10, paddingTop: 10}}>
                Agent Name : {item.name}
              </Text>
              <Text style={{paddingLeft: 10}}>
                Mobile Number : {item.mobile_number}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: Theme.themeColor2,
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
});

export default PaymentRequestScreen;
