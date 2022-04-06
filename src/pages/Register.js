import {useSelector} from 'react-redux';
import {register} from '../redux/apiCalls';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert, Text, TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView} from 'react-native';
import Header from '../components/Header';
import Button from '../utils/Button';
import Icon from 'react-native-vector-icons/AntDesign';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const user = useSelector(state => state.user);
  const RegisterHandler = () => {
    //Validating user inputs
    (!/^[a-zA-Z0-9_]+$/i.test(username))
    ? Alert.alert('Error', 'Username can only contain underscore,letters and numbers.')
    : username.length <= 3
      ? Alert.alert('Error', 'Username must contain at least 4 characters.')
      : !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ? Alert.alert('Error', 'Email address must be valid.')
      : password.length <= 3
      ? Alert.alert('Error', 'Password must contain at least 4 characters.')
      : password !== confirmPassword
      ? Alert.alert('Error', 'Passwords does not match.')
      : password === confirmPassword ?
      register({
        username: username,
        password: password,
        email: email,
      }).then(res =>
        res.request.status === 201
          ? Alert.alert('Success', 'Account creation successful!',{},{cancelable:true})
          : Alert.alert('Oops', 'Account exists!\n Either email or username is already in use.',
          {},{cancelable: true}),
      ): "";
  };

  return (
    <>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.body}>
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
            placeholder="Email"
            onChangeText={setEmail}
            placeholderTextColor="green"
          />
          <Icon.Button
            name={'mail'}
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
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={showPassword}
            onChangeText={setConfirmPassword}
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
          title="Register"
          color="#1eb900"
          onPressFunction={RegisterHandler}
        />
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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

export default Register;
