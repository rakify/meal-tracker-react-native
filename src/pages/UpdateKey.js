import {useSelector} from 'react-redux';
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Button from '../utils/Button';
import Header from '../components/Header';
import {updateKey} from './../redux/apiCalls';
import Icon from 'react-native-vector-icons/AntDesign';

export default function UpdateKey() {
  const user = useSelector(state => state.user.currentUser);
  const requestKey = () => {
    updateKey(user._id).then(res =>
      Alert.alert('Oops', res.request.responseText.slice(1, -1)),
    );
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
          <Text style={styles.caption}>
            Are you sure you want to request for a new key?
          </Text>
        <Button
          style={{alignSelf: 'center'}}
          title={'Sure'}
          color="#1eb900"
          onPressFunction={requestKey}
        />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    paddingTop:10,
  },
  caption: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
