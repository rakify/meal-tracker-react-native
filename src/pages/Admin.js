import React from 'react';
import {View, Text} from 'react-native';
import Header from './../components/Header';

const Admin = () => {
  return (
    <>
      <Header />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Admin Page</Text>
      </View>
    </>
  );
};

export default Admin;
