import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../redux/apiCalls';
import Header from './../components/Header';

const Home = ({navigation}) => {
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(user.username, dispatch);
  }, [user.username, dispatch]);

  return (
    <>
      <Header />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Welcome {user.username}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default Home;
