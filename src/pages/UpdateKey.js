import {useSelector} from 'react-redux';
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Button from '../utils/Button';
import Header from '../components/Header';
import {updateKey} from './../redux/apiCalls';

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
        <View style={styles.title}>
          <Text style={styles.titleText}>Update Key</Text>
        </View>
        <View>
          <Text style={styles.caption}>
            Are you sure you want to request for a new key?
          </Text>
        </View>
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
  },
  title: {
    margin: 20,
    alignSelf: 'center',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  caption: {
    marginBottom: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
