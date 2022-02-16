import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/apiCalls';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import Header from '../components/Header';
import Button from '../utils/Button';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log(user);
  const LoginHandler = () => {
    (username.length < 3 || password.length < 3) &&
      Alert.alert(
        'Warning',
        'Username & Password must contain at least 4 characters.',
      );

    username.length >= 3 &&
      password.length >= 3 &&
      login(dispatch, {username, password}).then(
        res =>
          res.request.status !== 200 &&
          Alert.alert('Oops', res.request.responseText.slice(1, -1)),
      );
  };
  return (
    <>
      <Header from="login" />
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />

        <Button title="Login" color="#1eb900" onPressFunction={LoginHandler} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  input: {
    fontSize: 20,
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    margin: 5,
    textAlign: 'center',
  },
});

export default Login;
