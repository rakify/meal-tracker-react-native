import {useSelector, useDispatch} from 'react-redux';
import React, {useState} from 'react';
import {updateUser} from '../redux/apiCalls';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Button from './../utils/Button';
import Header from './../components/Header';

export default function UpdateUser() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const [inputs, setInputs] = useState({
    email: user.email,
    key: '',
    member: '',
  });

  const handleChange = (name, value) => {
    setInputs(prev => {
      return {...prev, [name]: value};
    });
  };

  const handleSubmit = () => {
    let members = user.members;
    if (inputs.member.length > 0) members = [...members, inputs.member];
    const updatedUser = {
      email: inputs.email,
      admin_key: inputs.key,
      members: members,
    };
    updateUser(user._id, updatedUser, dispatch).then(res =>
      res.request.status !== 200
        ? Alert.alert('Oops', res.request.responseText.slice(1, -1))
        : Alert.alert('Success', 'User updated successfully.'),
    );
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Update Information</Text>
        </View>
        <View style={styles.inputField}>
          <Text style={styles.caption}>Members</Text>
          <Text>{user.members.map(i => i + ', ')}</Text>
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            onChangeText={value => handleChange('member', value)}
            placeholder="Add Another.."
            placeholderTextColor="green"
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.caption}>
            {inputs.email === user.email ? 'Manager Email' : 'Update Email'}
          </Text>
          <TextInput
            style={styles.input}
            value={inputs.email}
            onChangeText={value => handleChange('email', value)}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.caption}>Manager Key</Text>
          <TextInput
            style={styles.input}
            value={inputs.key}
            onChangeText={value => handleChange('key', value)}
            placeholder="0000"
            placeholderTextColor="green"
          />
        </View>
        <Button
          style={{alignSelf: 'center'}}
          title={'Submit'}
          color="#1eb900"
          onPressFunction={handleSubmit}
        />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
    marginRight: 20,
    fontWeight: 'bold',
  },
  inputField: {
    marginBottom: 10,
    marginLeft: 20,
  },
  input: {
    fontSize: 15,
    width: 200,
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: '#555',
  },
});
