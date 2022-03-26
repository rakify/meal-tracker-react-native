import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/apiCalls';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import Header from '../components/Header';
import Button from '../utils/Button';
import Icon from 'react-native-vector-icons/AntDesign';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
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
      <Header />
      <View style={styles.body}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            placeholderTextColor="green"
          />
          <Icon.Button
            name={'user'}
            solid
            backgroundColor={'transparent'}
            iconStyle={{
              marginRight: 0,
              color: 'green',
            }}
            borderRadius={0}></Icon.Button>
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={showPassword}
            onChangeText={setPassword}
            placeholderTextColor="green"
          />
          <Icon.Button
            onPress={() => setShowPassword(!showPassword)}
            name={showPassword ? 'lock1' : 'unlock'}
            solid
            backgroundColor={'transparent'}
            iconStyle={{
              marginRight: 0,
              color: 'green',
            }}
            borderRadius={0}></Icon.Button>
        </View>

        <Button
          title={user.isFetching ? 'Wait..' : 'Login'}
          color="#1eb900"
          onPressFunction={LoginHandler}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#555',
  },
  input: {
    fontSize: 20,
    width: 280,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default Login;
