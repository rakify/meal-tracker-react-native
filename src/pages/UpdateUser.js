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
import Icon from 'react-native-vector-icons/AntDesign';
import {updateKey} from './../redux/apiCalls';

export default function UpdateUser() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const [inputs, setInputs] = useState({
    email: user.email,
    key: '',
    member: '',
  });
  const [next, setNext] = useState();

  const requestKey = async () => {
    Alert.alert('Loading', 'Wait for a while...');
    updateKey(user._id).then(res =>
      Alert.alert('Oops', res.request.responseText.slice(1, -1)),
    );
  };

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
       
        {/*No members means new user*/}
        {user.members.length === 0 && !next && (
          <>
            <View style={styles.inputField}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#0f6a94',
                  fontSize: 25,
                }}>
                WELCOME AND HOPE YOU ARE THE MANAGER SINCE YOU'RE REGISTERING.
                {'\n\n'}
                <Icon name="star" size={20} color="#0f6a94" /> First step is to
                set a key which will be required to update anything here and
                will only be available to the manager who holds the email
                associate with this account.
                {'\n\n'}
                <Icon name="star" size={20} color="#0f6a94" /> If you already
                have the key please proceed to next.
                {'\n'}
              </Text>
            </View>
            <View style={styles.inputFieldRow2}>
              <Button
                style={{width: 70, height: 25}}
                title={'Set Key'}
                color="#1eb900"
                onPressFunction={requestKey}
              />
              <Button
                style={{width: 70, height: 25}}
                title={'Next ➽'}
                color="#1eb900"
                onPressFunction={() => {
                  setNext(true);
                }}
              />
            </View>
          </>
        )}

        {(user.members.length > 0 || next) && (
          <>
            <View style={styles.inputField}>
              <Text style={styles.caption}>
                <Icon name="team" size={20} color="#0f6a94" /> Members
              </Text>
              {next ? (
                <Text style={{color: 'red'}}>
                  No members added yet.{'\n'}Lets start by adding yourself.
                </Text>
              ) : (
                <Text style={{fontSize: 17}}>
                  {user.members.map(i => i + ', ')}
                </Text>
              )}
            </View>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                onChangeText={value => handleChange('member', value)}
                placeholder={next ? 'Your name' : 'Add Another..'}
                placeholderTextColor="green"
              />
            </View>
            {!next && (
              <View style={styles.inputField}>
                <Text style={styles.caption}>
                  <Icon name="mail" size={20} color="#0f6a94" /> Update Email{' '}
                </Text>
                <TextInput
                  style={styles.input}
                  value={inputs.email}
                  onChangeText={value => handleChange('email', value)}
                />
              </View>
            )}
            <View style={styles.inputField}>
              <Text style={styles.caption}>
                <Icon name="key" size={20} color="#0f6a94" /> Manager Key
              </Text>
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
              title={'Update'}
              color="#1eb900"
              onPressFunction={handleSubmit}
            />
          </>
        )}
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
  title: {
    margin: 20,
    alignSelf: 'center',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    textDecorationLine: 'underline',
  },
  caption: {
    color: '#0f6a94',
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputField: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  inputFieldRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 20,
  },
  inputFieldRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    fontSize: 15,
    width: 150,
    height: 45,
    paddingLeft: 10,
    borderWidth: 0.5,
    borderColor: '#555',
    marginRight: 10,
  },
});
